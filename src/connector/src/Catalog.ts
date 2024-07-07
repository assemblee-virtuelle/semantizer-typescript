import { Document, DocumentConstructor, DocumentImplFactory, DocumentWithDestructiveOperationsConstructor, Loader, Thing } from "@semantizer/types";

export type Catalog = Document<Thing, Thing> & CatalogOperations;

export interface CatalogOperations {
    getName(): string | undefined;
}

export function CatalogMixin<
    TBase extends DocumentWithDestructiveOperationsConstructor
>(Base: TBase) {

    return class CatalogMixinImpl extends Base implements CatalogOperations {

        public constructor(...args: any[]) {
            super(...args);
        }

        public getName(): string | undefined {
            // return this.getStatementAboutSelf("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#name")?.getValue();
            return this.getStatement("http://localhost:8000/lecoqlibre/enterprise/catalogs/index#catalog1", "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#name")?.getValue();
        }

    }

}

export class CatalogFactory {
    
    private _DocumentImpl: DocumentConstructor<Thing, Thing>;
    private _documentImplFactory: DocumentImplFactory;

    constructor(DocumentImpl: DocumentConstructor<Thing, Thing>, documentImplFactory: DocumentImplFactory) { 
        this._DocumentImpl = DocumentImpl;
        this._documentImplFactory = documentImplFactory;
    }

    public create(): Catalog {
        const CatalogImpl = CatalogMixin(this._DocumentImpl);
        return new CatalogImpl(this._documentImplFactory);
    }

    public async load(uri: string, loader: Loader): Promise<Catalog> {
        return loader.load<Catalog>(uri, this);
    }

}