import { FactoryImpl, FactoryImplReadonly } from './core-default/FactoryImpl.js';

export { default as Semantizer } from './Semantizer.js';

const factory = new FactoryImpl();
const document = factory.createDocument();
const thing = document.createThingWithUri("name")
    .createStatement("ex:predicate", "value")
    .createStatement("ex:predicate2", "value2");

const factoryReadonly = new FactoryImplReadonly();
const documentReadonly = factoryReadonly.createDocument();

// console.log(document);

document.forEach(thing => thing.forEach(s => console.log(s.getSubject(), s.getValue())));