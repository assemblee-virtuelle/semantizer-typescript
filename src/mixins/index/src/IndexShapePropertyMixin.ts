import { BlankNode, DatasetSemantizerMixinConstructor, Literal, NamedNode, Semantizer } from "@semantizer/types";
import { IndexShapeProperty, IndexShapePropertyBase } from "./types";

export type IndexShapePropertyBaseMixinConstructor = new (...args: any[]) => IndexShapePropertyBase;

export function IndexShapePropertyValueMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexShapePropertyValueMixinImpl extends Base implements IndexShapePropertyBase {
        
        public isPatternProperty(): boolean {
            return false;
        }
        
        public isValueProperty(): boolean {
            return true;
        }
  
        public getPredicate(): NamedNode {
            return this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://www.w3.org/ns/shacl#hasValue');
        }

    }

}

export function IndexShapePropertyPatternMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexShapePropertyValueMixinImpl extends Base implements IndexShapePropertyBase {
        
        public isPatternProperty(): boolean {
            return true;
        }
        
        public isValueProperty(): boolean {
            return false;
        }
  
        public getPredicate(): NamedNode {
            return this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://www.w3.org/ns/shacl#pattern');
        }

    }

}

export function IndexShapePropertyMixin<
    TBase extends IndexShapePropertyBaseMixinConstructor
>(Base: TBase) {

    return class IndexShapePropertyMixinImpl extends Base implements IndexShapeProperty {
        
        public getValue(): BlankNode | Literal | NamedNode | undefined {
            const predicate = this.getPredicate();
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

export function indexShapePropertyValueFactory(semantizer: Semantizer) {
    const DatasetImpl = semantizer.getConfiguration().getDatasetImpl();
    return semantizer.getMixinFactory(IndexShapePropertyMixin, IndexShapePropertyValueMixin(DatasetImpl));
}

export function indexShapePropertyPatternFactory(semantizer: Semantizer) {
    const DatasetImpl = semantizer.getConfiguration().getDatasetImpl();
    return semantizer.getMixinFactory(IndexShapePropertyMixin, IndexShapePropertyPatternMixin(DatasetImpl));
}