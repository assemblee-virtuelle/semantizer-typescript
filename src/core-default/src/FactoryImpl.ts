import { Document, DocumentFactory, Loader, Statement, Thing } from "@semantizer/types";
import DocumentImpl, { DocumentImplFactoryImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";

export class FactoryImpl implements DocumentFactory<Document<Thing, Thing>> {

    public create(): Document<Thing, Thing> {
        const factory = new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl);
        return new DocumentImpl<Thing, Thing>(factory);
    }

    // public async load(uri: string, loader: Loader): Promise<Document<Thing<Statement>, Thing<Statement>>> {
    //     return loader.load<Document<Thing<Statement>, Thing<Statement>>>(uri, this);
    // }

}

export default FactoryImpl;