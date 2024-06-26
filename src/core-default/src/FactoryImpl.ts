import { Document, Factory, Thing } from "@semantizer/types";
import DocumentImpl from "./DocumentImpl.js";
import ThingImpl from "./ThingImpl.js";
import StatementImpl from "./StatementImpl.js";

export class FactoryImpl implements Factory<Document<Thing, Thing>> {

    public create(): Document<Thing, Thing> {
        return new DocumentImpl<Thing, Thing>(ThingImpl, ThingImpl, StatementImpl);
    }

}

export default FactoryImpl;