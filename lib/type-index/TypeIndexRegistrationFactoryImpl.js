import ThingImpl, { ThingType } from "../core-default/ThingImpl";
import ThingWithHelpersMixin from "../thing-helpers/ThingWithHelpersMixin";
import { TypeIndexRegistrationImpl } from "./TypeIndexRegistrationImpl";
const ThingWithHelpers = ThingWithHelpersMixin(ThingImpl);
export class TypeIndexRegistrationFactoryDefaultImpl {
    createThingToDescribeDocument(typeIndex) {
        return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
            .addRdfTypeStatement("solid:TypeIndex")
            .addRdfTypeStatement("solid:ListedDocument");
    }
    createThing(typeIndex, uri) {
        return new TypeIndexRegistrationImpl(typeIndex, uri);
    }
    createThingWithoutUri(typeIndex, nameHint) {
        throw new Error("Adding blank nodes to TypeIndex is not allowed.");
    }
}
export default TypeIndexRegistrationFactoryDefaultImpl;
//# sourceMappingURL=TypeIndexRegistrationFactoryImpl.js.map