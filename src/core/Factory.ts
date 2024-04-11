import { Context } from "./Context";
import { ContainedThingOf, Document, DocumentBase, DocumentReadonly, SelfDescribingThingOf, StatementOf } from "./Document";
import Resource from "./Resource";

export interface Factory<
    DocumentType extends Document<any, any, any, any>// | DocumentReadonly<any, any, any, any>
    //DocumentTypeReadonly extends DocumentReadonly<any, any>
> {
    createDocument(uri?: string, context?: Context): DocumentType;

    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<DocumentType>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<DocumentType>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<DocumentType>;

    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType>;
}

export interface FactoryForCopying<
    InputDocument extends DocumentBase<any, any>,
    OutputDocument extends DocumentBase<any, any>
> {
    createDocument(document: InputDocument): OutputDocument;

    createThingToDescribeDocument(thing: SelfDescribingThingOf<InputDocument>): SelfDescribingThingOf<OutputDocument>;
    createThing(thing: ContainedThingOf<InputDocument>): ContainedThingOf<OutputDocument>;
    createThingWithoutUri(thing: ContainedThingOf<InputDocument>): ContainedThingOf<OutputDocument>;

    createStatement(statement: StatementOf<InputDocument>): StatementOf<OutputDocument>;
}

/*export interface FactoryReadonly<
    DocumentTypeReadonly extends DocumentReadonly<any, any>
> extends Factory<DocumentTypeReadonly> {}*/

export default Factory;