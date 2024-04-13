import { Context } from "../core/Context";
import { Document, ContainedThingOf, SelfDescribingThingOf, StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import { TypeIndex, TypeIndexReadonly } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration.js";
type WrappedDocument = Document<TypeIndex, TypeIndexReadonly>;
export declare class FactoryImpl implements Factory<TypeIndex> {
    private _documentFactory;
    constructor(factory: Factory<WrappedDocument>);
    createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndex;
    createThingToDescribeDocument(document: TypeIndex): SelfDescribingThingOf<TypeIndex>;
    createThing(document: TypeIndex, uri: string): ContainedThingOf<TypeIndex>;
    createThingWithoutUri(document: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration;
    createStatement(thing: TypeIndexRegistration, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndex>;
}
export {};
//# sourceMappingURL=FactoryImpl.d.ts.map