import { DocumentImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";
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
        return new ThingImpl(document);
    }
    createThingWithoutUri(document, nameHint) {
        throw new Error("Method not implemented."); //return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }
    createStatement(thing, about, value, datatype, language) {
        return new StatementImpl(thing, about, value, datatype, language);
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