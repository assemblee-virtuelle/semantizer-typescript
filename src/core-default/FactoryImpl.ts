import { Context, Resource } from "../core/Common";
import { ContainedThingOf, Document, DocumentBase, InputOf, OutputOf, SelfDescribingThingOf, StatementOf } from "../core/Document";
import Factory from "../core/Factory";
import { Statement } from "../core/Statement";
import { Thing } from "../core/Thing";
import { DocumentImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";

// type StatementType = StatementWritable<Thing<any, any>>;
// type StatementTypeReadonly = Statement<Thing<any, any>>;
// type ThingType = ThingWritable<StatementType, DocumentWritable<any, any>>;
// type ThingTypeReadonly = Thing<StatementTypeReadonly, Document<any, any>>;

// type DocRead = DocumentBase<Thing<Statement<any>, any>, Thing<Statement<any>, any>>;
// // DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>,
// type DocumentType = Document<DocumentBase<ThingType, ThingType>, DocRead>;
// type DocumentTypeReadonly = Document<DocRead, DocumentType>;

type Doc = Document<DocumentBase<Thing<Statement<any>, any>, Thing<Statement<any>, any>>>;

// for a genreic facto, take constructors of Document, Thing and Statement?
export class FactoryImpl/*<
    DocumentType extends Document<any, any> //= Document<Thing<Statement<any>, any>, Thing<Statement<any>, any>>
>*/ implements Factory<DocumentImpl<Doc>> { 

    public createDocument(uri?: string, context?: Context): DocumentImpl<Doc> {
        return new DocumentImpl<Doc>(this) ;// as Factory<DocumentImpl<Doc>>);
    }

    /*public createDocumentReadonly(document: Document<DocumentType, DocumentTypeReadonly>): DocumentTypeReadonly {
        throw new Error("Method not implemented.");
    }*/

    public createThingToDescribeDocument(document: DocumentImpl<Doc>): SelfDescribingThingOf<Doc> { 
        return new ThingImpl<StatementOf<typeof document>, DocumentImpl<Doc>>(document); // as SelfDescribingThingOf<typeof document>; //<Statement<ThingType>, DocumentType>(document);
    }

    public createThing(document: DocumentImpl<Doc>, uri: string): ContainedThingOf<Doc> {
        return new ThingImpl<StatementOf<typeof document>, typeof document>(document) as ContainedThingOf<Doc>;
    }

    public createThingWithoutUri(document: DocumentImpl<Doc>, nameHint?: string): ContainedThingOf<Doc> {
        throw new Error("Method not implemented.");//return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }

    public createStatement(thing: ContainedThingOf<DocumentImpl<Doc>>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<Doc> {
        return new StatementImpl(thing, about, value, datatype, language) as StatementOf<Doc>;
    }

}

/*export class FactoryImplForCopying implements FactoryForCopying<DocumentType> {

    createDocument(document: DocumentType): DocumentTypeReadonly {
        throw new Error("Method not implemented.");
        //return Object.freeze(new DocumentImplReadonly<ThingTypeReadonly, ThingTypeReadonly, ThingType, ThingType>(document));
    }
    createThingToDescribeDocument(thing: ThingType): ThingTypeReadonly {
        throw new Error("Method not implemented.");
    }
    createThing(thing: ThingType): ThingTypeReadonly {
        throw new Error("Method not implemented.");
    }
    createThingWithoutUri(thing: ThingType): ThingTypeReadonly {
        throw new Error("Method not implemented.");
    }
    createStatement(statement: StatementType): StatementTypeReadonly {
        throw new Error("Method not implemented.");
    }

}*/