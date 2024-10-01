import { BlankNode, DatasetSemantizerMixinConstructor, Literal, NamedNode, Semantizer } from "@semantizer/types";
import { indexShapePropertyPatternFactory, indexShapePropertyValueFactory } from "./IndexShapePropertyMixin.js";
import { IndexShape, IndexShapeComparisonResult, IndexShapeProperty } from "./types";

export function IndexShapeMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexShapeMixinImpl extends Base implements IndexShape {

        public constructor(...args: any[]) {
            super(...args);
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            this.add(
                dataFactory.quad(
                    this.getOrigin()!,
                    dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), 
                    dataFactory.namedNode("https://www.w3.org/ns/shacl#NodeShape")
                )
            );
        }
        
        public hasMultiCriteria(): boolean {
            return this.getFilterProperties().length > 1;
        }

        public getRdfTypeProperty(): IndexShapeProperty {
            for (const p of this.getPropertiesAll()) {
                const path = p.getPath();
                if (path && path.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                    return p;
                }
            }
            throw new Error("No Rdf type property was found.");
        }
        
        public getFilterProperties(): IndexShapeProperty[] {
            const properties: IndexShapeProperty[] = [];
            for (const p of this.getPropertiesAll()) {
                const path = p.getPath();
                if (path && path.value !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                    properties.push(p);
                }
            }
            return properties;
        }

        /**
         * 
         * @param other 
         * @returns -2 if the targeted RDF types are different, -1 if the targeted RDF types 
         * are equals but the targeted values path are different, 0 if the targeted RDF types 
         * are equals and the targeted values path are equals, and 1 if the targeted RDF types 
         * are equals and the targeted values are equals.
         */
        public compares(other: IndexShape): IndexShapeComparisonResult {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();

            if (!this.getRdfTypeProperty().equals(other.getRdfTypeProperty())) {
                return new IndexShapeComparisonResultImpl(-2, dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'));
            }
            
            for (const thisProperty of this.getFilterProperties()) {
                for (const otherProperty of other.getFilterProperties()) {
                    const comparisonResult = thisProperty.compares(otherProperty);
                    if (comparisonResult === 0 || comparisonResult === 1) {
                        return new IndexShapeComparisonResultImpl(comparisonResult, thisProperty.getPath()!);
                    }
                }
            }

            return new IndexShapeComparisonResultImpl(-1, dataFactory.namedNode('')); //throw new Error("No filter property was found."); // return -1;
        }
        
        // TODO: enhance
        public countProperties(): number {
            return this.getPropertiesAll().length;
        }
        
        public forEachProperty(callbackfn: (value: IndexShapeProperty, index?: number | undefined, array?: IndexShapeProperty[] | undefined) => void): void {
            this.getPropertiesAll().forEach(p => callbackfn(p));
        }

        public addTargetRdfType(rdfType: NamedNode): void {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const path = dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
            const predicate = dataFactory.namedNode('https://www.w3.org/ns/shacl#hasValue');
            _addProperty(this, path, predicate, rdfType);
        }

        public addValueProperty(path: NamedNode, value: NamedNode | Literal | BlankNode): void {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode('https://www.w3.org/ns/shacl#hasValue');
            _addProperty(this, path, predicate, value);   
        }

        public addPatternProperty(path: NamedNode, value: NamedNode | Literal | BlankNode): void {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode('https://www.w3.org/ns/shacl#pattern');
            _addProperty(this, path, predicate, value);   
        }

        public getPropertiesAll(): IndexShapeProperty[] {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode('https://www.w3.org/ns/shacl#property');
            const properties = this.getLinkedObjectAll(predicate);

            // Warning here: this code creates the property which can be either instance of 
            // ShapePropertyValue or ShapePropertyPattern. To evaluate which one to create 
            // we test if the property has a sh:pattern predicate. In the case of the meta-meta 
            // index (root level), the sh:pattern will likely not be present and a Value 
            // property will be created instead of a Pattern property. At this step we can't 
            // know which one to create. There is no pb since this code is called each time we 
            // try to access to the properties of the shape.
            return properties.map(p => {
                if (p.some(q => q.predicate.equals(dataFactory.namedNode('https://www.w3.org/ns/shacl#pattern')))) {
                    return this.getSemantizer().build(indexShapePropertyPatternFactory, p);
                }
                return this.getSemantizer().build(indexShapePropertyValueFactory, p);
            });
        }

    }

}

export function indexShapeFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexShapeMixin);
}

const _addProperty = (shape: IndexShape, path: NamedNode, predicate: NamedNode, value: NamedNode | Literal | BlankNode): void => {
    const dataFactory = shape.getSemantizer().getConfiguration().getRdfDataModelFactory();
    const property = dataFactory.blankNode();

    shape.add(
        dataFactory.quad(
            property,
            dataFactory.namedNode('https://www.w3.org/ns/shacl#path'),
            path
        )
    );

    shape.add(
        dataFactory.quad(
            property,
            predicate,
            value
        )
    );

    shape.add(
        dataFactory.quad(
            shape.getOrigin()!,
            dataFactory.namedNode('https://www.w3.org/ns/shacl#property'), 
            property
        )
    );
}

export class IndexShapeComparisonResultImpl implements IndexShapeComparisonResult {

    private _result: number;
    private _path: NamedNode;

    public constructor(result: number, path: NamedNode) {
        this._result = result;
        this._path = path;
    }

    public getResult(): number {
        return this._result;
    }

    public getComparedPath(): NamedNode {
        return this._path;
    }

}