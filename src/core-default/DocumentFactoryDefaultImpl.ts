import Context from "../core/Context";
import Document, { DocumentReadonly } from "../core/Document";
import DocumentFactory from "../core/DocumentFactory";
import { ThingReadonly, Thing } from "../core/Thing";
import { DocumentDefaultImpl, DocumentReadonlyDefaultImpl } from "./DocumentDefaultImpl";

export class DocumentFactoryDefaultImpl implements DocumentFactory {

    public createDocument<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing>(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing> {
        return new DocumentDefaultImpl<ContainedThing, SelfDescribingThing>();
    }

    public createDocumentReadonly<ContainedThing extends ThingReadonly = ThingReadonly, SelfDescribingThing extends ThingReadonly = ThingReadonly>(uri?: string, context?: Context): DocumentReadonly<ContainedThing, SelfDescribingThing> {
        return Object.freeze(new DocumentReadonlyDefaultImpl<ContainedThing, SelfDescribingThing>());
    }

}

export default DocumentFactoryDefaultImpl;

const f = new DocumentFactoryDefaultImpl();
const r = f.createDocumentReadonly();
r.toCopyWritable().deleteContext();