import Context from "../core/Context";
import Document, { ReadonlyDocument } from "../core/Document";
import DocumentFactory from "../core/DocumentFactory";
import { ReadonlyThing, Thing } from "../core/Thing";
import { DocumentDefaultImpl, ReadonlyDocumentDefaultImpl } from "./DocumentDefaultImpl";

export class DocumentFactoryDefaultImpl implements DocumentFactory {

    public createDocument<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing>(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing> {
        return new DocumentDefaultImpl<ContainedThing, SelfDescribingThing>();
    }

    public createReadonlyDocument<ContainedThing extends ReadonlyThing = ReadonlyThing, SelfDescribingThing extends ReadonlyThing = ReadonlyThing>(uri?: string, context?: Context): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        return Object.freeze(new ReadonlyDocumentDefaultImpl<ContainedThing, SelfDescribingThing>());
    }

}

export default DocumentFactoryDefaultImpl;

const f = new DocumentFactoryDefaultImpl();
const r = f.createReadonlyDocument();
r.toCopyWritable().deleteContext();