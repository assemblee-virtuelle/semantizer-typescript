import SemanticObjectMap from '../lib/semantic-object-map/SemanticObjectMap.js';

const semanticObject = new SemanticObjectMap();

await semanticObject.addSemanticProperty("prop1", "Person");
semanticObject.getSemanticPropertyValue("prop1");

//console.log(await semanticObject.getSemanticPropertyValueAll("prop1"));