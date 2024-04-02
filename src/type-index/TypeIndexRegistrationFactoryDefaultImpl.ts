import Document from "../core/Document";
import Thing from "../core/Thing";
import ThingDefaultImpl, { ThingType } from "../core-default/ThingDefaultImpl";
import ThingFactory from "../core/ThingFactory";
import TypeIndex from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
import { TypeIndexRegistrationDefaultImpl } from "./TypeIndexRegistrationDefaultImpl";

export class TypeIndexRegistrationFactoryDefaultImpl implements ThingFactory<TypeIndexRegistration, Thing> {

    public createThingToDescribeDocument(typeIndex: TypeIndex): Thing {
        return new ThingDefaultImpl(typeIndex, ThingType.ForDescribing)
            .addRdfTypeStatement("solid:TypeIndex")
            .addRdfTypeStatement("solid:ListedDocument");
    }

    public createThing(typeIndex: TypeIndex, uri: string): TypeIndexRegistration {
        return new TypeIndexRegistrationDefaultImpl(typeIndex, uri);
    }

    public createThingWithoutUri(typeIndex: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration {
        throw new Error("Adding blank nodes to TypeIndex is not allowed.");
    }
    
}

export default TypeIndexRegistrationFactoryDefaultImpl;