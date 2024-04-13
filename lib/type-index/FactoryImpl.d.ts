import { Context } from "../core/Context";
import { ContainedThingOf, Document, SelfDescribingThingOf, StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import { TypeIndex, TypeIndexReadonly, TypeIndexSelfDescribingThing } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration.js";
type DocumentConstructor = new (factory: Factory<TypeIndex>) => Document<TypeIndex, TypeIndexReadonly>;
type ThingConstructor<T> = new (document: TypeIndex) => T;
export declare class FactoryImpl<WrappedDocumentImpl extends DocumentConstructor, //Constructor<Document<TypeIndex, TypeIndexReadonly>>
WrappedThingImpl extends ThingConstructor<TypeIndexSelfDescribingThing>> implements Factory<TypeIndex> {
    private _WrappedDocumentImpl;
    private _WrappedThingImpl;
    constructor(documentImpl: WrappedDocumentImpl, thingImpl: WrappedThingImpl);
    createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndex;
    createThingToDescribeDocument(document: TypeIndex): SelfDescribingThingOf<TypeIndex>;
    createThing(document: TypeIndex, uri: string): ContainedThingOf<TypeIndex>;
    createThingWithoutUri(document: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration;
    createStatement(thing: TypeIndexRegistration, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndex>;
}
export {};
//# sourceMappingURL=FactoryImpl.d.ts.map