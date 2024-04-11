import { FactoryImpl as DocumentFactory } from './core-default/FactoryImpl.js';
import { Document } from './core/Document.js';
import { Statement } from './core/Statement.js';
import { Thing } from './core/Thing.js';
import { FactoryImpl as TypeIndexFactory } from './type-index/FactoryImpl.js';

export { default as Semantizer } from './Semantizer.js';

const documentFactory = new DocumentFactory();
const document/*: Document<Thing<Statement<Thing<any, any>>, Document<any, any>>, Thing<Statement<Thing<any, any>>, Document<any, any>>>*/ = documentFactory.createDocument();
const thing/*: Thing<Statement<Thing<any, any>>, Document<any, any>>*/ = document.createThingWithUri("name")
    .createStatement("ex:predicate", "value")
    .createStatement("ex:predicate2", "value2");

// const factoryReadonly = new FactoryImplReadonly();
// const documentReadonly = factoryReadonly.createDocument();

// console.log(document);

document.forEach(thing => thing.forEach(s => console.log(s.getSubject(), s.getValue())));

const typeIndexFactory = new TypeIndexFactory();
const typeIndexDocument = typeIndexFactory.createDocument();
typeIndexDocument.createThingToSelfDescribe();
typeIndexDocument.createThingWithUri("test")
    .createStatement("solid:pred1", "solid:value1")
    .createStatement("solid:pred2", "solid:value2")

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