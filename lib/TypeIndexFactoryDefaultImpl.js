import ThingDefaultImpl, { ThingType } from "./ThingDefaultImpl";
import { TypeIndexRegistrationDefaultImpl } from "./TypeIndexRegistrationDefaultImpl";
export class TypeIndexFactoryDefaultImpl {
    createThingToDescribeDocument(typeIndex) {
        return new ThingDefaultImpl(typeIndex, ThingType.ForDescribing);
    }
    createThing(typeIndex, uri) {
        return new TypeIndexRegistrationDefaultImpl(typeIndex, uri);
    }
    createThingWithoutUri(typeIndex, nameHint) {
        throw new Error("Adding blank nodes to TypeIndex is not allowed.");
    }
}
//# sourceMappingURL=TypeIndexFactoryDefaultImpl.js.map