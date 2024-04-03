import DocumentBase from "../core/Document";
import Thing from "../core/Thing";
import ThingDefaultImpl, { ThingType } from "../core-default/ThingDefaultImpl";
import ThingFactory from "../core/ThingFactory";
import TypeIndexBase from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
import { TypeIndexRegistrationDefaultImpl } from "./TypeIndexRegistrationDefaultImpl";

export class TypeIndexRegistrationFactoryDefaultImpl implements ThingFactory<TypeIndexRegistration, Thing> {

    public createThingToDescribeDocument(typeIndex: TypeIndexBase): Thing {
        return new ThingDefaultImpl(typeIndex, ThingType.ForDescribing)
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