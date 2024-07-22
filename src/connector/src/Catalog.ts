import { DocumentWithDestructiveOperations, DocumentWithDestructiveOperationsConstructor, Thing } from "@semantizer/types";
import { ConnectorConstructor } from "./Connector.js";

export type Catalog = DocumentWithDestructiveOperations<Thing, Thing> & CatalogOperations;

export interface CatalogOperations {
    getName(): string | undefined;
}

export function CatalogMixin<
    TBase extends DocumentWithDestructiveOperationsConstructor<Thing, Thing> & ConnectorConstructor
>(Base: TBase) {

    return class CatalogMixinImpl extends Base implements CatalogOperations {

        public constructor(...args: any[]) {
            super(...args);
        }

        public getName(): string | undefined {
            return this.getThingAboutSelf()?.getStatement("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#name")?.getValue();
        }

    }

}