import Context from "./Context";
import { Document, DocumentReadonly } from "./Document";
import { ThingReadonly, Thing } from "./Thing";

export interface DocumentFactory {
    createDocument<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing>(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing>;
    createReadonlyDocument<ContainedThing extends ThingReadonly = ThingReadonly, SelfDescribingThing extends ThingReadonly = ThingReadonly>(uri?: string, context?: Context): DocumentReadonly<ContainedThing, SelfDescribingThing>;
}

export default DocumentFactory;