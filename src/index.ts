import { FactoryImpl as DocumentFactory } from './core-default/FactoryImpl.js';
import { Document, DocumentBase, DocumentDecorated, DocumentReadonly, SelfDescribingThingOf, StatementOf } from './core/Document.js';
import { Statement, StatementReadonly } from './core/Statement.js';
import { Thing, ThingReadonly } from './core/Thing.js';
import { FactoryImpl as TypeIndexFactory } from './type-index/FactoryImpl.js';
import { TypeIndex, TypeIndexReadonly } from './type-index/TypeIndex.js';

export { default as Semantizer } from './Semantizer.js';

type Dc = DocumentDecorated<Document<DocumentBase<Thing<any, any>, any>, any>, DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>>;

const documentFactory = new DocumentFactory<Dc, any>();
const document = documentFactory.createDocument();

const thing = document.createThingWithUri("name")
    .createStatement("ex:predicate", "value")
    .createStatement("ex:predicate2", "value2");

// const factoryReadonly = new FactoryImplReadonly();
// const documentReadonly = factoryReadonly.createDocument();

// console.log(document);

document.forEach(thing => thing.forEach(s => console.log(s.getSubject(), s.getValue())));

type t = StatementOf<Document<TypeIndex, TypeIndexReadonly>>;
type t2 = SelfDescribingThingOf<TypeIndex>

const typeIndexFactory = new TypeIndexFactory(new DocumentFactory<TypeIndex, TypeIndexReadonly>());


const typeIndexDocument = typeIndexFactory.createDocument();
typeIndexDocument.createThingToSelfDescribe();
typeIndexDocument.createThingWithUri("test")
.createStatement("solid:pred1", "solid:value1")
.createStatement("solid:pred2", "solid:value2");

const selfDescribingThing = typeIndexFactory.createThingToDescribeDocument(typeIndexDocument);

typeIndexDocument.createRegistration("dfc-b:Catalog", "noname")
    .addInstance("http://example.org/instance");

typeIndexDocument.getThingThatSelfDescribes()?.forEach(s => console.log(s.getSubject(), s.getValue()));

console.log("-------");

typeIndexDocument.forEach(thing => {
    console.log("Thing ", thing.getUri());
    thing.forEach(s => console.log(s.getSubject(), s.getValue()));
});

// const typeIndexReadonly = typeIndexDocument.getFactoryForCopying().createDocument(typeIndexDocument);
// const registrationReadonly = typeIndexReadonly.get("");

// const documentReadonly = document.toCopyReadonly();
// const thingReadonly = documentReadonly.get("");