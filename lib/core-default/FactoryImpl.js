import { DocumentImpl } from "./DocumentImpl.js";
import ThingImpl from "./ThingImpl.js";
// type StatementType = Statement<Thing<any, any>>;
// type StatementTypeReadonly = StatementReadonly<ThingReadonly<any, any>>;
// type ThingType = Thing<StatementType, Document<any, any>>;
// type ThingTypeReadonly = ThingReadonly<StatementTypeReadonly, DocumentReadonly<any, any>>;
// type DocRead = DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>;
// DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>,
// type DocumentType = Document<DocumentBase<ThingType, ThingType>, DocRead>;
// type DocumentTypeReadonly = DocumentReadonly<DocRead, DocumentType>;
//type t = InputOf<DocumentType>;
// export type TypeIndex = Document<TypeIndexBase, TypeIndexBaseReadonly> &
//     WithReadOperations<TypeIndexRegistration> & 
//     WithWriteOperations<TypeIndexRegistration>;
// GET => Document<TypeIndex, TypeIndexReadonly>
export class FactoryImpl {
    createDocument(uri, context) {
        return new DocumentImpl(this); // as Factory<DocumentType>);
    }
    /*public createDocumentReadonly(document: Document<DocumentType, DocumentTypeReadonly>): DocumentTypeReadonly {
        throw new Error("Method not implemented.");
    }*/
    createThingToDescribeDocument(document) {
        return new ThingImpl(document); //<Statement<ThingType>, DocumentType>(document);
    }
    createThing(document, uri) {
        throw new Error("Method not implemented."); //return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }
    createThingWithoutUri(document, nameHint) {
        throw new Error("Method not implemented."); //return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }
    createStatement(thing, about, value, datatype, language) {
        throw new Error("Method not implemented."); //return new StatementImpl(thing, about, value, datatype, language);
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
//# sourceMappingURL=FactoryImpl.js.map