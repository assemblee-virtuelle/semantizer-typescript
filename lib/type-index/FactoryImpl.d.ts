import { Context } from "../core/Context";
import { StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import { TypeIndexDocument, TypeIndexRegistrationThing } from "./TypeIndex";
export declare class FactoryImpl implements Factory<TypeIndexDocument> {
    createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndexDocument;
    createThingToDescribeDocument(document: TypeIndexDocument): TypeIndexRegistrationThing;
    createThing(document: TypeIndexDocument, uri: string): TypeIndexRegistrationThing;
    createThingWithoutUri(document: TypeIndexDocument, nameHint?: string | undefined): TypeIndexRegistrationThing;
    createStatement(thing: TypeIndexRegistrationThing, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndexDocument>;
}
//# sourceMappingURL=FactoryImpl.d.ts.map