import Thing from "../contracts/Thing";
import EditableDocument from "./EditableDocument";
import Document from "../contracts/Document";

export interface SynchronizedDocument<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Document<ContainedThing, SelfDescribingThing> {
    toLocalCopy(): EditableDocument<ContainedThing, SelfDescribingThing>;
}

export default SynchronizedDocument;