import StoreMap from "./StoreMap.js";
import IdGenerator from "./IdGenerator.js";
export default class StoreMapSemanticable extends StoreMap {
    constructor() {
        super(new IdGenerator());
    }
    setSemanticable(semanticObject) {
        const semanticId = ""; //semanticObject.getSynchronizedResourceUrl();
        if (semanticId !== "")
            super.set(semanticId, semanticObject);
    }
    setAll(semanticObjects) {
        semanticObjects.forEach(semanticObject => this.setSemanticable(semanticObject));
    }
}
//# sourceMappingURL=StoreMapSemanticable.js.map