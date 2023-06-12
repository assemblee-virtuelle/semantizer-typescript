import SemanticObject from '../lib/object/SemanticObject.js';
import SemanticProperty from '../lib/property/SemanticProperty.js';
import StoreMapSemanticable from '../lib/store/StoreMapSemanticable.js';

const store = new StoreMapSemanticable();
const semanticObject = new SemanticObject({store: store});
semanticObject.addSemanticProperty("rdfs:type", "Person");
//semanticObject.addSemanticProperty("dfc:name", "Jean");

console.log(semanticObject.getSemanticProperty("rdfs:type"));