import { Document, DocumentConstructor, DocumentImplFactory, DocumentWithDestructiveOperationsConstructor, Loader, Statement, StatementConstructor, Thing, ThingConstructor, ThingConstructorMixin } from "@semantizer/types";

export type Catalog = Thing<Statement> & CatalogOperations;

export interface CatalogOperations {
    getName(): string | undefined;
}

export function CatalogMixin<
    TBase extends ThingConstructorMixin<Thing<Statement>>
>(Base: TBase) {

    return class CatalogMixinImpl extends Base implements CatalogOperations {

        public constructor(...args: any[]) {
            super(...args);
        }

        public getName(): string | undefined {
            return this.getStatement("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#name")?.getValue();
        }

    }

}

export class CatalogFactory {
    
    private _ThingImpl: ThingConstructor<Thing, Statement>;
    private _StatementImpl: StatementConstructor<Statement>;

    constructor(ThingImpl: ThingConstructor<Thing, Statement>, StatementImpl: StatementConstructor<Statement>) { 
        this._ThingImpl = ThingImpl;
        this._StatementImpl = StatementImpl;
    }

    public create(uri: string): Catalog {
        const CatalogImpl = CatalogMixin(this._ThingImpl);
        return new CatalogImpl(this._StatementImpl, uri);
    }

}