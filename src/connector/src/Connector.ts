import { DocumentImpl, DocumentImplFactoryImpl, StatementImpl, ThingImpl } from "@semantizer/core-default";
import { DocumentImplFactory, Loader, Thing } from "@semantizer/types";
import { Person, PersonFactory, PersonMixin } from "./Person.js";
import { WebIdProfileMixin } from "@semantizer/webid";

export class Connector {

    private _factory: DocumentImplFactory<Thing, Thing>;

    public constructor() {
        this._factory = new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl);
    }

    // TODO: uri to replace load?
    public createPerson(): Person {
        const PersonImpl = PersonMixin(WebIdProfileMixin(DocumentImpl));
        return new PersonImpl(this._factory);
    }

    public async loadPerson(uri: string, loader: Loader): Promise<Person> {
        return await loader.load<Person>(uri, new PersonFactory(DocumentImpl, new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl)));
    }

}