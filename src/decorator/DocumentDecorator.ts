import Document from "../contracts/Document";
import Thing from "../contracts/Thing";

export interface DocumentDecorator<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Document<ContainedThing, SelfDescribingThing> {

}

export default DocumentDecorator;