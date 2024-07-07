import { DocumentImpl, DocumentImplFactoryImpl, StatementImpl, ThingImpl } from "@semantizer/core-default";
import { LoaderRdfjs } from "@semantizer/loader-rdfjs";
import { DocumentConstructor, DocumentImplFactory, Loader, Thing } from "@semantizer/types";
import { WebIdProfile, WebIdProfileConstructor, WebIdProfileMixin } from "@semantizer/webid";
import { Catalog, CatalogFactory } from "./Catalog.js";

export type Enterprise = WebIdProfile & EnterpriseOperations;

export interface EnterpriseOperations {
    getName(): string | undefined;
    getMaintainedCatalogs(): Promise<Catalog>[];
    getMaintainedCatalogsUri(): string[];
}

export function EnterpriseMixin<
    TBase extends WebIdProfileConstructor
>(Base: TBase) {

    return class EnterpriseMixinImpl extends Base implements EnterpriseOperations {

        public constructor(...args: any[]) {
            super(...args);
        }

        public getName(): string | undefined {
            return this.getPrimaryTopic().getStatement("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#name")?.getValue();
        }

        public getMaintainedCatalogs(): Promise<Catalog>[] {
            const loader = new LoaderRdfjs();
            const factory = new CatalogFactory(DocumentImpl, new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl));
            return this.getPrimaryTopic().getStatementAll("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#maintains").map(s => factory.load(s.getValue(), loader));
        }

        public getMaintainedCatalogsUri(): string[] {
            return this.getPrimaryTopic().getStatementAll("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#maintains").map(s => s.getValue());
        }

    }

}

export class EnterpriseFactory {
    
    private _DocumentImpl: DocumentConstructor<Thing, Thing>;
    private _documentImplFactory: DocumentImplFactory;

    constructor(DocumentImpl: DocumentConstructor<Thing, Thing>, documentImplFactory: DocumentImplFactory) { 
        this._DocumentImpl = DocumentImpl;
        this._documentImplFactory = documentImplFactory;
    }

    public create(): Enterprise {
        const EnterpriseImpl = EnterpriseMixin(WebIdProfileMixin(this._DocumentImpl));
        return new EnterpriseImpl(this._documentImplFactory);
    }

    public async load(uri: string, loader: Loader): Promise<Enterprise> {
        return loader.load<Enterprise>(uri, this);
    }
}