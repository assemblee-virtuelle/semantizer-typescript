import SemanticObjectMap from '../lib/object/SemanticObjectMap.js';

const semanticObject = new SemanticObjectMap();

semanticObject.addSemanticProperty("prop1", "Person");

console.log(await semanticObject.getSemanticPropertyValue("prop1"));