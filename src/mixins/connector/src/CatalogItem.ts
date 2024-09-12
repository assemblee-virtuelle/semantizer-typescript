import { Dataset, Semantizer } from "@semantizer/types";
import { DatasetCore } from "@rdfjs/types"; // PB if deleted

export type CatalogItem = Dataset & CatalogItemOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface CatalogItemOperations {
    getName(): string | undefined;
}

export function CatalogItemMixin<
    TBase extends new (...args: any[]) => Dataset
>(Base: TBase) {

    return class CatalogItemMixinImpl extends Base implements CatalogItemOperations {

        public getName(): string | undefined {
            return this.getLiteral(this.getUri()!, DFC + 'name');
        }

    }

}

export function CatalogItemFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(CatalogItemMixin, _DatasetImpl);
}