import { DatasetSemantizer, DatasetSemantizerMixinConstructor, Semantizer } from "@semantizer/types";
import { CatalogItem, catalogItemFactory } from "./CatalogItem.js";

export type Catalog = DatasetSemantizer & CatalogOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface CatalogOperations {
    getName(): string | undefined;
    getDescription(): string | undefined;
    getCatalogItems(): CatalogItem[];
}

export function CatalogMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class CatalogMixinImpl extends Base implements CatalogOperations {

        public getName(): string | undefined {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode(DFC + 'name');
            return this.getLiteral(this.getOrigin()!, predicate)?.value;
        }

        public getDescription(): string | undefined {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode(DFC + 'description');
            return this.getLiteral(this.getOrigin()!, predicate)?.value;
        }

        public getCatalogItems(): CatalogItem[] {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode(DFC + 'lists');
            return this.getLinkedObjectAll(predicate).map(d => this.getSemantizer().build(catalogItemFactory, d));
        }

    }

}

export function catalogFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(CatalogMixin);
}