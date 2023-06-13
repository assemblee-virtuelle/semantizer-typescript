import SemanticObject from '../lib/object/SemanticObject.js';
import SemanticProperty from '../lib/property/SemanticProperty.js';
import StoreMapSemanticable from '../lib/store/StoreMapSemanticable.js';

const store = new StoreMapSemanticable();

const referenced = new SemanticObject({store: store});
referenced.addSemanticProperty("name", "value");

const reference = new SemanticObject({store: store});
reference.addSemanticProperty("reference", referenced);

console.log(await reference.getSemanticProperty("reference"));