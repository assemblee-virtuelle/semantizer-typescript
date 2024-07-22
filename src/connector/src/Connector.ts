import { DocumentImpl, DocumentImplFactoryImpl, StatementImpl, ThingImpl } from "@semantizer/core-default";
import { LoaderRdfjs } from "@semantizer/loader-rdfjs";
import { MixinFactory as MixinFactoryImpl } from "@semantizer/mixins";
import { DocumentWithDestructiveOperationsConstructor, Loader, Mixin, MixinFactory, Thing } from "@semantizer/types";
import { Catalog, CatalogMixin } from "./Catalog.js";
import { Enterprise, EnterpriseMixin } from "./Enterprise.js";
import { Person, PersonMixin } from "./Person.js";
import WebIdProfileMixin from "@semantizer/webid";

export type ConnectorConstructor = new (...args: any[]) => Connector;

export interface Connector {
    createCatalog(uri: string): Catalog;
    loadCatalog(uri: string, loader?: Loader): Promise<Catalog>;
    loadPerson(uri: string, loader?: Loader): Promise<Person>;
    loadEnterprise(uri: string, loader?: Loader): Promise<Enterprise>;
}

export class ConnectorImpl implements Connector {

    private _loader: Loader;
    private _mixinFactory: MixinFactory;

    public constructor() {
        this._loader = new LoaderRdfjs();
        this._mixinFactory = new MixinFactoryImpl(DocumentImpl<Thing, Thing>, new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl));
    }

    public createCatalog(uri: string): Catalog {
        throw new Error();
    }

    public async loadCatalog(uri: string, loader?: Loader): Promise<Catalog> {
        return await this._loader.load<Catalog>(uri, this._mixinFactory, (impl) => CatalogMixin(ConnectorMixin((impl))));
    }

    public async loadPerson(uri: string, loader?: Loader): Promise<Person> {
        return await this._loader.load<Person>(uri, this._mixinFactory, (impl) => PersonMixin(ConnectorMixin(WebIdProfileMixin(impl))));
    }

    public async loadEnterprise(uri: string, loader?: Loader): Promise<Enterprise> {
        return await this._loader.load<Enterprise>(uri, this._mixinFactory, (impl) => EnterpriseMixin(ConnectorMixin(WebIdProfileMixin(impl))));
    }
}

export function ConnectorMixin<
    TBase extends DocumentWithDestructiveOperationsConstructor<Thing, Thing>
>(Base: TBase) {

    return class ConnectorMixinImpl extends Base {

        _connectorImpl: Connector;

        public constructor(...args: any[]) {
            super(...args);
            this._connectorImpl = new ConnectorImpl();
        }

        public createCatalog(uri: string): Catalog {
            return this._connectorImpl.createCatalog(uri);
        }
    
        public async loadCatalog(uri: string, loader?: Loader): Promise<Catalog> {
            return this._connectorImpl.loadCatalog(uri, loader);
        }

        public async loadPerson(uri: string, loader?: Loader): Promise<Person> {
            return this._connectorImpl.loadPerson(uri, loader);
        }

        public async loadEnterprise(uri: string, loader?: Loader): Promise<Enterprise> {
            return this._connectorImpl.loadEnterprise(uri, loader);
        }

    }

}