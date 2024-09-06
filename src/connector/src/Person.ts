import { SolidWebIdProfile, SolidWebIdProfileConstructor, SolidWebIdProfileMixin, SolidWebIdProfileFactory } from "@semantizer/solid-webid";
import { Enterprise, EnterpriseFactory } from "./Enterprise.js";
import { DatasetCore } from "@rdfjs/types"; // PB if deleted
import { Dataset, Semantizer } from "@semantizer/types";
import { WebIdProfileMixin } from "@semantizer/webid";

export type Person = SolidWebIdProfile & PersonOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface PersonOperations {
    getName(): string | undefined;
    getAffiliatedEnterprises(): Enterprise[];
}

export function PersonMixin<
    TBase extends SolidWebIdProfileConstructor //& ConnectorConstructor
>(Base: TBase) {

    return class PersonMixinImpl extends Base implements PersonOperations {

        public getName(): string | undefined {
            return this.getLiteral(this.getUri()!, DFC + 'name'); // getPrimaryTopic ?
        }

        public getAffiliatedEnterprises(): Enterprise[] {
            return this.getObjectAll(DFC + 'affiliatedBy').map(d => EnterpriseFactory(this.getSemantizer()).build(d));
        }

    }

}

export function PersonFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(PersonMixin, SolidWebIdProfileMixin(WebIdProfileMixin(_DatasetImpl)));
}