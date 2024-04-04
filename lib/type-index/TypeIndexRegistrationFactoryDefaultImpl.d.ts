import Thing from "../core/Thing";
import ThingFactory from "../core/ThingFactory";
import TypeIndexBase from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
export declare class TypeIndexRegistrationFactoryDefaultImpl implements ThingFactory<TypeIndexRegistration, Thing> {
    createThingToDescribeDocument(typeIndex: TypeIndexBase): Thing;
    createThing(typeIndex: TypeIndexBase, uri: string): TypeIndexRegistration;
    createThingWithoutUri(typeIndex: TypeIndexBase, nameHint?: string | undefined): TypeIndexRegistration;
}
export default TypeIndexRegistrationFactoryDefaultImpl;
//# sourceMappingURL=TypeIndexRegistrationFactoryDefaultImpl.d.ts.map