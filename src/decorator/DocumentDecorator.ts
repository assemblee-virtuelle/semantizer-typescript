import Document from "../core/Document";
import Thing from "../core/Thing";

export interface DocumentDecorator<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Document<ContainedThing, SelfDescribingThing> {

}

export default DocumentDecorator;