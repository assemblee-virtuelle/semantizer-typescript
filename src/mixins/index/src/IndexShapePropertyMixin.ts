import { Dataset, Quad, BlankNode, Literal, NamedNode, Term, DatasetSemantizer, DatasetSemantizerMixinConstructor, Semantizer, Stream } from "@semantizer/types";
import { Index, IndexEntry, IndexShape, IndexShapeProperty } from "./types";
import { DatasetCore } from "@rdfjs/types"; // TODO: PB when removed
import { Transform, Readable } from "stream";

export function IndexShapePropertyMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexShapePropertyMixinImpl extends Base implements IndexShapeProperty {
        
        public getValue(): BlankNode | Literal | NamedNode | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://www.w3.org/ns/shacl#hasValue');
            const object = this.getLinkedObject(predicate);
            return object ? object.getOrigin()! : undefined;
        }
        
        // TODO: check return type (no blank node)
        public getPath(): NamedNode | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://www.w3.org/ns/shacl#path');
            const object = this.getLinkedObject(predicate)
            return object ? object.getOrigin()! as NamedNode : undefined;
        }

        public hasSamePath(other: IndexShapeProperty): boolean {
            return this.getPath()?.equals(other.getPath()) ?? false;
        }
        
        public hasSameValue(other: IndexShapeProperty): boolean {
            if (!this.getValue())
                throw new Error("This property to compare has no value.");
            return this.getValue()!.equals(other.getValue()); // this.getValue must be checked before
        }

        public equals(other: IndexShapeProperty): boolean {
            return this.hasSamePath(other) && this.hasSameValue(other);
        }
        
        /**
         * @param other 
         * @returns -1 if paths are different or if both paths and values are different, 0 if paths are the same 
         * but `this` property has no value, and 1 if both paths and values are equals.
         */
        public compares(other: IndexShapeProperty): number {
            if (!this.hasSamePath(other)) {
                return -1
            }
          
            if (this.getValue()) {
                return this.hasSameValue(other) ? 1 : -1;
            }
            
            return 0;
        }

    }

}

export function indexShapePropertyFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexShapePropertyMixin);
}