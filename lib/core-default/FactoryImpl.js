import { DocumentImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";
export class FactoryImpl {
    createDocument(uri, context) {
        return new DocumentImpl(this); // as DocumentType;
    }
    createThingToDescribeDocument(document) {
        return new ThingImpl(document);
    }
    createThing(document, uri) {
        return new ThingImpl(document);
    }
    createThingWithoutUri(document, nameHint) {
        return new ThingImpl(document);
    }
    createStatement(thing, about, value, datatype, language) {
        return new StatementImpl(thing, about, value, datatype, language);
    }
}
// export class FactoryImplReadonly implements Factory<DocumentTypeReadonly> {
//     private _factory = new FactoryImpl<DocumentDefaultImplReadonly>();
//     public createDocument(uri?: string, context?: Context): DocumentTypeReadonly {
//         const document = this._factory.createDocument() as DocumentTypeReadonly;
//         return Object.freeze(document);
//     }
//     public createThingToDescribeDocument(document: DocumentTypeReadonly): SelfDescribingThingOf<DocumentTypeReadonly> {
//         const thing = this._factory.createThingToDescribeDocument(document as DocumentDefaultImplReadonly);
//         return Object.freeze(thing) as SelfDescribingThingOf<DocumentTypeReadonly>;
//     }
//     public createThing(document: DocumentTypeReadonly, uri: string): ContainedThingOf<DocumentTypeReadonly> {
//         const thing = this._factory.createThing(document as DocumentDefaultImplReadonly, uri);
//         return Object.freeze(thing) as ContainedThingOf<DocumentTypeReadonly>;
//     }
//     public createThingWithoutUri(document: DocumentTypeReadonly, nameHint?: string): ContainedThingOf<DocumentTypeReadonly> {
//         const thing = this._factory.createThingWithoutUri(document as DocumentDefaultImplReadonly);
//         return Object.freeze(thing) as ContainedThingOf<DocumentTypeReadonly>;
//     }
//     public createStatement(thing: ContainedThingOf<DocumentTypeReadonly>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentTypeReadonly> {
//         throw new Error("Not implemented.");
//     }
// }
// const factory = new FactoryImpl();
// const document = factory.createDocument();
// document.deleteContext();
// document.createThingToSelfDescribe().createStatement("ex:prop", "");
// // @ts-expect-error
// document.toCopyReadonly().deleteContext();
// const factoryReadonly = new FactoryImplReadonly();
// const documentReadonly = factoryReadonly.createDocument();
// // @ts-expect-error
// documentReadonly.deleteContext();
// const getted = documentReadonly.get("");
// const copied = getted?.toCopy()
//# sourceMappingURL=FactoryImpl.js.map