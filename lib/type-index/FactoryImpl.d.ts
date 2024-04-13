import { Context } from "../core/Context";
import { ContainedThingOf, SelfDescribingThingOf, StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import { TypeIndex } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration.js";
export declare class FactoryImpl implements Factory<TypeIndex> {
    createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndex;
    createThingToDescribeDocument(document: TypeIndex): SelfDescribingThingOf<TypeIndex>;
    createThing(document: TypeIndex, uri: string): ContainedThingOf<TypeIndex>;
    createThingWithoutUri(document: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration;
    createStatement(thing: TypeIndexRegistration, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndex>;
}
//# sourceMappingURL=FactoryImpl.d.ts.map