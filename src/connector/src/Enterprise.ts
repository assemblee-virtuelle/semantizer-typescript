import { SolidWebIdProfile, SolidWebIdProfileConstructor } from "@semantizer/solid-webid";
import { Catalog } from "./Catalog.js";
import { DatasetCore } from "@rdfjs/types"; // PB if deleted

export type Enterprise = SolidWebIdProfile & EnterpriseOperations;

export interface EnterpriseOperations {
    getName(): string | undefined;
    getMaintainedCatalogs(): Promise<Catalog>[];
    getMaintainedCatalogsUri(): string[];
}

export function EnterpriseMixin<
    TBase extends SolidWebIdProfileConstructor // & ConnectorConstructor
>(Base: TBase) {

    return class EnterpriseMixinImpl extends Base implements EnterpriseOperations {

        // public constructor(...args: any[]) {
        //     super(...args);
        // }

        public getName(): string | undefined {
            return this.getPrimaryTopic().getStatement("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#name")?.getValue();
        }

        public getMaintainedCatalogs(): Promise<Catalog>[] {
            const maintains = "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#maintains";
            return this.getPrimaryTopic().getStatementAll(maintains).map(s => this.loadCatalog(s.getValue()));
        }

        public getMaintainedCatalogsUri(): string[] {
            return this.getPrimaryTopic().getStatementAll("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#maintains").map(s => s.getValue());
        }

    }

}