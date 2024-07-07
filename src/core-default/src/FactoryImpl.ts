import { Document, DocumentFactory, Semantizer, Thing } from "@semantizer/types";
import DocumentImpl from "./DocumentImpl.js";
import ThingImpl from "./ThingImpl.js";
import StatementImpl from "./StatementImpl.js";

export class FactoryImpl implements DocumentFactory<Document<Thing, Thing>> {

    private _semantizer: Semantizer;

    constructor(semantizer: Semantizer) { 
        this._semantizer = semantizer
    }
    
    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public create(): Document<Thing, Thing> {
        throw new Error("Not implemented");
        // return new DocumentImpl<Thing, Thing>(ThingImpl, ThingImpl, StatementImpl);
    }

}

export default FactoryImpl;