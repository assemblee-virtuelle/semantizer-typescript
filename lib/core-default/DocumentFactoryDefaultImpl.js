import DocumentDefaultImpl from "./DocumentDefaultImpl";
export class DocumentFactoryDefaultImpl {
    createDocument(uri, context) {
        return new DocumentDefaultImpl();
    }
    createReadonlyDocument(uri, context) {
        return new DocumentDefaultImpl();
    }
}
export default DocumentFactoryDefaultImpl;
//# sourceMappingURL=DocumentFactoryDefaultImpl.js.map