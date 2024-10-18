import { DatasetSemantizer, DatasetSemantizerMixinConstructor, Semantizer } from "@semantizer/types";

export type CatalogItem = DatasetSemantizer & CatalogItemOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface CatalogItemOperations {
    getName(): string | undefined;
}

export function CatalogItemMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class CatalogItemMixinImpl extends Base implements CatalogItemOperations {

        public getName(): string | undefined {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode(DFC + 'name');
            return this.getLiteral(this.getOrigin()!, predicate)?.value;
        }

    }

}

export function catalogItemFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(CatalogItemMixin);
}