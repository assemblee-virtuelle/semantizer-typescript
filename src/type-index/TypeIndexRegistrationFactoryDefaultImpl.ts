import ThingDefaultImpl, { ThingType } from "../core-default/ThingDefaultImpl";
import Thing from "../core/Thing";
import ThingFactory from "../core/ThingFactory";
import ThingHelpersMixin from "../thing-helpers/ThingHelpersMixin";
import TypeIndexBase from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
import { TypeIndexRegistrationDefaultImpl } from "./TypeIndexRegistrationDefaultImpl";

const ThingWithHelpers = ThingHelpersMixin(ThingDefaultImpl);

export class TypeIndexRegistrationFactoryDefaultImpl implements ThingFactory<TypeIndexRegistration, Thing> {

    public createThingToDescribeDocument(typeIndex: TypeIndexBase): Thing {
        return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
            .addRdfTypeStatement("solid:TypeIndex")
            .addRdfTypeStatement("solid:ListedDocument");
    }

    public createThing(typeIndex: TypeIndexBase, uri: string): TypeIndexRegistration {
        return new TypeIndexRegistrationDefaultImpl(typeIndex, uri);
    }

    public createThingWithoutUri(typeIndex: TypeIndexBase, nameHint?: string | undefined): TypeIndexRegistration {
        throw new Error("Adding blank nodes to TypeIndex is not allowed.");
    }
    
}

export default TypeIndexRegistrationFactoryDefaultImpl;