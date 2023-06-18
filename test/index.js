import SemanticObjectMap from '../lib/semantic-object-map/SemanticObjectMap.js';

const semanticObject = new SemanticObjectMap();

semanticObject.addSemanticProperty("prop1", "Person");
semanticObject.addSemanticProperty("prop2", true);
semanticObject.addSemanticProperty("prop3", 3);

//console.log(semanticObject.getSemanticPropertyValue("prop1"));
//console.log(semanticObject.getSemanticPropertyValue("prop2"));
//console.log(semanticObject.getSemanticPropertyValue("prop3"));

//semanticObject.setSemanticProperty("prop1", "Person2", "Person");
semanticObject.setSemanticProperty("prop2", false, true);
//semanticObject.setSemanticProperty("prop3", 4, 3);

//console.log(semanticObject.getSemanticPropertyValue("prop1"));
console.log(semanticObject.getSemanticPropertyValue("prop2"));
//console.log(semanticObject.getSemanticPropertyValue("prop3"));