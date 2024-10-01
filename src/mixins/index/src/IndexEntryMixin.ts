import { DatasetSemantizer, DatasetSemantizerMixinConstructor, Semantizer } from "@semantizer/types";
import { indexFactory } from "./IndexMixin.js";
import { indexShapeFactory } from "./IndexShapeMixin.js";
import { Index, IndexEntry, IndexShape, IndexShapeComparisonResult } from "./types";

export function IndexEntryMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexEntryMixinImpl extends Base implements IndexEntry {
        
        public getTargetUri(): string | undefined {
            throw new Error("Method not implemented.");
        }

        public compareShape(shape: IndexShape): IndexShapeComparisonResult {
            const thisShape = this.getShape();
            if (!thisShape)
                throw new Error("The entry does not have a shape.");
            return thisShape.compares(shape);
        }

        // TODO: rewrite
        public hasSubIndex(): boolean {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasSubIndex');
            return this.getLinkedObject(predicate) !== undefined;
        }

        public getTarget(): DatasetSemantizer | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasTarget');
            return this.getLinkedObject(predicate);
        }

        public getSubIndex(): Index | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasSubIndex');
            const dataset = this.getLinkedObject(predicate);
            return dataset ? this.getSemantizer().build(indexFactory, dataset): undefined;
        }

        public getShape(): IndexShape | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasShape');
            const dataset = this.getLinkedObject(predicate);
            return dataset ? this.getSemantizer().build(indexShapeFactory, dataset) : undefined;
        }

    }
    
}

export function indexEntryFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexEntryMixin);
}