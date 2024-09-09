import { Dataset, Semantizer } from "@semantizer/types";
import { DatasetCore } from "@rdfjs/types"; // PB if deleted
import { CatalogItem, CatalogItemFactory } from "./CatalogItem.js";

export type Catalog = Dataset & CatalogOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface CatalogOperations {
    getName(): string | undefined;
    getDescription(): string | undefined;
    getCatalogItems(): CatalogItem[];
}

export function CatalogMixin<
    TBase extends new (...args: any[]) => Dataset
>(Base: TBase) {

    return class CatalogMixinImpl extends Base implements CatalogOperations {

        public getName(): string | undefined {
            return this.getLiteral(this.getUri()!, DFC + 'name');
        }

        public getDescription(): string | undefined {
            return this.getLiteral(this.getUri()!, DFC + 'description');
        }

        public getCatalogItems(): CatalogItem[] {
            return this.getObjectAll(DFC + 'lists').map(d => CatalogItemFactory(this.getSemantizer()).build(d));
        }

    }

}

export function CatalogFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(CatalogMixin, _DatasetImpl);
}