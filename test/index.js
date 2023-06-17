import SemanticObjectMap from '../lib/semantic-object-map/SemanticObjectMap.js';

const semanticObject = new SemanticObjectMap();

semanticObject.addSemanticProperty("prop1", "Person");
semanticObject.setSemanticProperty("prop1", "Person2");

console.log(await semanticObject.getSemanticPropertyValueAll("prop1"));