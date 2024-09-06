import { Dataset, Semantizer } from "@semantizer/types";
import { DatasetCore } from "@rdfjs/types"; // PB if deleted

export type Catalog = Dataset & CatalogOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface CatalogOperations {
    getName(): string | undefined;
}

export function CatalogMixin<
    TBase extends new (...args: any[]) => Dataset
>(Base: TBase) {

    return class CatalogMixinImpl extends Base implements CatalogOperations {

        public getName(): string | undefined {
            return this.getLiteral(this.getUri()!, DFC + 'name');
        }

    }

}

export function CatalogFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(CatalogMixin, _DatasetImpl);
}