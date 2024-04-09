import ThingImpl, { ThingType } from "../core-default/ThingImpl";
import { Thing } from "../core/Thing";
import ThingWithHelpersMixin from "../thing-helpers/ThingWithHelpersMixin";
import { TypeIndex } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";
import { TypeIndexRegistrationImpl } from "./TypeIndexRegistrationImpl";

const ThingWithHelpers = ThingWithHelpersMixin(ThingImpl);

export class TypeIndexRegistrationFactoryDefaultImpl implements Factory<TypeIndexRegistration, Thing> {

    public createThingToDescribeDocument(typeIndex: TypeIndex): Thing {
        return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
            .addRdfTypeStatement("solid:TypeIndex")
            .addRdfTypeStatement("solid:ListedDocument");
    }

    public createThing(typeIndex: TypeIndex, uri: string): TypeIndexRegistration {
        return new TypeIndexRegistrationImpl(typeIndex, uri);
    }

    public createThingWithoutUri(typeIndex: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration {
        throw new Error("Adding blank nodes to TypeIndex is not allowed.");
    }

}

export default TypeIndexRegistrationFactoryDefaultImpl;