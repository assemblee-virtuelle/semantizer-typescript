import { DocumentDefaultImpl, ReadonlyDocumentDefaultImpl } from "./DocumentDefaultImpl";
export class DocumentFactoryDefaultImpl {
    createDocument(uri, context) {
        return new DocumentDefaultImpl();
    }
    createReadonlyDocument(uri, context) {
        return Object.freeze(new ReadonlyDocumentDefaultImpl());
    }
}
export default DocumentFactoryDefaultImpl;
const f = new DocumentFactoryDefaultImpl();
const r = f.createReadonlyDocument();
r.toCopyWritable().deleteContext();
//# sourceMappingURL=DocumentFactoryDefaultImpl.js.map