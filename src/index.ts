import DocumentImpl from './core-default/DocumentImpl.js';
import DocumentDecoratedImpl from './core/Decorated.js';
import { Document } from './core/Document.js';
import { TypeIndex, TypeIndexStatement } from './type-index/TypeIndex.js';
import { TypeIndexImpl } from './type-index/TypeIndexImpl.js';

export { default as Semantizer } from './Semantizer.js';

const document = new DocumentDecoratedImpl(DocumentImpl);
const getted = document.getStatement("", "");

const documentReadonly = document as Document;
documentReadonly.getStatementAboutSelf("");

document.forEach(s => console.log(s.getSubject(), s.getValue()));

// const typeIndexFactory = new TypeIndexFactory(DocumentImpl, ThingImpl<Statement<TypeIndexRegistration>, TypeIndex>, ThingImpl<Statement<TypeIndexSelfDescribingThing>, TypeIndex>, StatementImpl) ;//DocumentImpl<TypeIndex, TypeIndexReadonly>);

const typeIndexDocument = new TypeIndexImpl(DocumentImpl<TypeIndexStatement>);
typeIndexDocument.getStatementAboutSelf("").getSubject();
typeIndexDocument.getStatement("", "").isForClass("");
typeIndexDocument.deleteContext();

const typeIndexReadonly = typeIndexDocument as TypeIndex;

typeIndexDocument.createThingToSelfDescribe();
typeIndexDocument.createThingWithUri("test")
.createStatement("solid:pred1", "solid:value1")
.createStatement("solid:pred2", "solid:value2");
//.save();

typeIndexDocument.createRegistration("dfc-b:Catalog", "noname")
    .addInstance("http://example.org/instance");

// const reg = typeIndexDocument.createRegistration("dfc-b:Catalog", "noname"); // return a readonly interface or just a Resource?
// typeIndexDocument.addInstance(reg, "http://example.org/instance");

typeIndexDocument.getThingThatSelfDescribes()?.forEach(s => console.log(s.getSubject(), s.getValue()));

console.log("-------");

typeIndexDocument.forEach(thing => {
    console.log("Thing ", thing.getUri());
    thing.forEach(s => console.log(s.getSubject(), s.getValue()));
});
