import { BlankNode, DatasetSemantizerMixinConstructor, Literal, NamedNode, Semantizer } from "@semantizer/types";
import { indexShapePropertyFactory } from "./IndexShapePropertyMixin.js";
import { IndexShape, IndexShapeProperty } from "./types";

export function IndexShapeMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexShapeMixinImpl extends Base implements IndexShape {

        public getRdfTypeProperty(): IndexShapeProperty {
            for (const p of this.getPropertiesAll()) {
                const path = p.getPath();
                if (path && path.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                    return p;
                }
            }
            throw new Error("No Rdf type property was found.");
        }
        
        public getFilterProperty(): IndexShapeProperty {
            for (const p of this.getPropertiesAll()) {
                const path = p.getPath();
                if (path && path.value !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                    return p;
                }
            }
            throw new Error("No filter property was found.");
        }

        /**
         * 
         * @param other 
         * @returns -2 if the targeted RDF types are different, -1 if the targeted RDF types 
         * are equals but the targeted values path are different, 0 if the targeted RDF types 
         * are equals and the targeted values path are equals, and 1 if the targeted RDF types 
         * are equals and the targeted values are equals.
         */
        public compares(other: IndexShape): number {
            if (!this.getRdfTypeProperty().equals(other.getRdfTypeProperty())) {
                return -2;
            }
            return this.getFilterProperty().compares(other.getFilterProperty());
        }
        
        public countProperties(): number {
            throw new Error("Method not implemented.");
        }
        
        public forEachProperty(callbackfn: (value: IndexShapeProperty, index?: number | undefined, array?: IndexShapeProperty[] | undefined) => void): void {
            this.getPropertiesAll().forEach(p => callbackfn(p));
        }

        public addProperty(path: NamedNode, value: NamedNode | Literal | BlankNode): void {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const property = dataFactory.blankNode();
            this.add(
                dataFactory.quad(
                    property,
                    dataFactory.namedNode('https://www.w3.org/ns/shacl#path'),
                    path
                )
            );
            this.add(
                dataFactory.quad(
                    property,
                    dataFactory.namedNode('https://www.w3.org/ns/shacl#hasValue'),
                    value
                )
            );
            this.add(
                dataFactory.quad(
                    this.getOrigin()!,
                    dataFactory.namedNode('https://www.w3.org/ns/shacl#property'), 
                    property
                )
            );
            this.add(
                dataFactory.quad(
                    this.getOrigin()!,
                    dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), 
                    dataFactory.namedNode("https://www.w3.org/ns/shacl#NodeShape")
                )
            );
        }

        public getPropertiesAll(): IndexShapeProperty[] {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://www.w3.org/ns/shacl#property');
            const properties = this.getLinkedObjectAll(predicate);
            return properties.map(p => this.getSemantizer().build(indexShapePropertyFactory, p));
        }

    }

}

export function indexShapeFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexShapeMixin);
}