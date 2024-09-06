import { Semantizer } from "@semantizer/types";
import { SolidWebIdProfile, SolidWebIdProfileConstructor, SolidWebIdProfileMixin } from "@semantizer/solid-webid";
import { Catalog, CatalogFactory } from "./Catalog.js";
import { DatasetCore } from "@rdfjs/types"; // PB if deleted
import WebIdProfileMixin from "@semantizer/webid";

export type Enterprise = SolidWebIdProfile & EnterpriseOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface EnterpriseOperations {
    getName(): string | undefined;
    getMaintainedCatalogs(): Catalog[];
}

export function EnterpriseMixin<
    TBase extends SolidWebIdProfileConstructor
>(Base: TBase) {

    return class EnterpriseMixinImpl extends Base implements EnterpriseOperations {

        public getName(): string | undefined {
            return this.getLiteral(this.getUri()!, DFC + 'name');
        }

        public getMaintainedCatalogs(): Catalog[] {
            return this.getObjectAll(DFC + 'maintains').map(d => CatalogFactory(this.getSemantizer()).build(d));
        }

    }

}

export function EnterpriseFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(EnterpriseMixin, SolidWebIdProfileMixin(WebIdProfileMixin(_DatasetImpl)));
}