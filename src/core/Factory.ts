import { Context, Resource } from "./Common";
import { ContainedThingOf, Document, DocumentBase, InputOf, OutputOf, SelfDescribingThingOf, StatementOf } from "./Document";

export interface Factory<
    DocumentType extends Document<any, any>// | DocumentWritable<any, any>
> {
    createDocument(uri?: string, context?: Context): DocumentType;

    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<InputOf<DocumentType>>; //Thing<StatementOf<InputOf<DocumentType>>, InputOf<DocumentType>>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<InputOf<DocumentType>>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<InputOf<DocumentType>>;

    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType>;
}

// export interface FactoryForCopying<
//     DocumentType extends Document<any, any> | DocumentWritable<any, any>
// > {
//     createDocument(document: DocumentType): OutputOf<DocumentType>;

//     /*createThingToDescribeDocument(thing: SelfDescribingThingOf<InputDocument>): SelfDescribingThingOf<OutputDocument>;
//     createThing(thing: ContainedThingOf<InputDocument>): ContainedThingOf<OutputDocument>;
//     createThingWithoutUri(thing: ContainedThingOf<InputDocument>): ContainedThingOf<OutputDocument>;

//     createStatement(statement: StatementOf<InputDocument>): StatementOf<OutputDocument>;*/
// }

export default Factory;