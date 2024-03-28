import Thing from "./Thing";
import ThingFactory from "./ThingFactory";
import TypeIndex from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
export declare class TypeIndexFactoryDefaultImpl implements ThingFactory<TypeIndexRegistration, Thing> {
    createThingToDescribeDocument(typeIndex: TypeIndex): Thing;
    createThing(typeIndex: TypeIndex, uri: string): TypeIndexRegistration;
    createThingWithoutUri(typeIndex: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration;
}
//# sourceMappingURL=TypeIndexFactoryDefaultImpl.d.ts.map