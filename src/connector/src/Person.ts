import { WebIdProfile, WebIdProfileConstructor } from "@semantizer/webid";
import { ConnectorConstructor } from "./Connector.js";
import { Enterprise } from "./Enterprise.js";

export type Person = WebIdProfile & PersonOperations;

export interface PersonOperations {
    getName(): string | undefined;
    getAffiliatedEnterprises(): Promise<Enterprise>[];
    getAffiliatedEnterprisesUri(): string[];
}

export function PersonMixin<
    TBase extends WebIdProfileConstructor & ConnectorConstructor
>(Base: TBase) {

    return class PersonMixinImpl extends Base implements PersonOperations {

        public constructor(...args: any[]) {
            super(...args);
        }

        public getName(): string | undefined {
            return this.getPrimaryTopic().getStatement("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#name")?.getValue();
        }

        public getAffiliatedEnterprises(): Promise<Enterprise>[] {
            const prefix = "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#";
            return this.getPrimaryTopic().getStatementAll(prefix + "affiliatedBy").map(s => this.loadEnterprise(s.getValue()));
        }

        public getAffiliatedEnterprisesUri(): string[] {
            return this.getPrimaryTopic().getStatementAll("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#affiliatedBy").map(s => s.getValue());
        }

    }

}