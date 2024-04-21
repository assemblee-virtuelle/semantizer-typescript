import { Context } from "../core/ContextImpl";
import { ContainedThingOf, Document, SelfDescribingThingOf, StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import { Statement } from "../core/Statement.js";
import { Thing } from "../core-default/Thing";
import { TypeIndex, TypeIndexReadonly, TypeIndexSelfDescribingThing } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration.js";
type DocumentConstructor = new (factory: Factory<TypeIndex>) => Document<TypeIndex, TypeIndexReadonly>;
type StatementConstructor = new (thing: TypeIndexRegistration, subject: string, value: string | Resource, datatype?: string | Resource, language?: string) => Statement<TypeIndexRegistration>;
type SelfDescribingThingConstructor = new (document: TypeIndex) => TypeIndexSelfDescribingThing;
type ContainedThingConstructor = new (document: TypeIndex) => Thing<Statement<TypeIndexRegistration>, TypeIndex>;
export declare class FactoryImpl<WrappedDocumentImpl extends DocumentConstructor, //Constructor<Document<TypeIndex, TypeIndexReadonly>>
WrappedContainedThingImpl extends ContainedThingConstructor, WrappedSelfDescribingThingImpl extends SelfDescribingThingConstructor, //<TypeIndexSelfDescribingThing | TypeIndexRegistration>,
WrappedStatementImpl extends StatementConstructor> implements Factory<TypeIndex> {
    private _WrappedDocumentImpl;
    private _WrappedContainedThingImpl;
    private _WrappedSelfDescribingThingImpl;
    private _WrappedStatementImpl;
    constructor(documentImpl: WrappedDocumentImpl, containedThingImpl: WrappedContainedThingImpl, selfDescribingThingImpl: WrappedSelfDescribingThingImpl, statementImpl: WrappedStatementImpl);
    createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndex;
    createThingToDescribeDocument(document: TypeIndex): SelfDescribingThingOf<TypeIndex>;
    createThing(document: TypeIndex, uri: string): ContainedThingOf<TypeIndex>;
    createThingWithoutUri(document: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration;
    createStatement(thing: TypeIndexRegistration, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndex>;
}
export {};
//# sourceMappingURL=FactoryImpl.d.ts.map