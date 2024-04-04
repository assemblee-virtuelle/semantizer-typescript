import ThingDefaultImpl, { ThingType } from "../core-default/ThingDefaultImpl";
import ThingWithHelpersMixin from "../thing-helpers/ThingWithHelpersMixin";
import { TypeIndexRegistrationDefaultImpl } from "./TypeIndexRegistrationDefaultImpl";
const ThingWithHelpers = ThingWithHelpersMixin(ThingDefaultImpl);
export class TypeIndexRegistrationFactoryDefaultImpl {
    createThingToDescribeDocument(typeIndex) {
        return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
            .addRdfTypeStatement("solid:TypeIndex")
            .addRdfTypeStatement("solid:ListedDocument");
    }
    createThing(typeIndex, uri) {
        return new TypeIndexRegistrationDefaultImpl(typeIndex, uri);
    }
    createThingWithoutUri(typeIndex, nameHint) {
        throw new Error("Adding blank nodes to TypeIndex is not allowed.");
    }
}
export default TypeIndexRegistrationFactoryDefaultImpl;
//# sourceMappingURL=TypeIndexRegistrationFactoryDefaultImpl.js.map