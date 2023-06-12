import Semanticable from "../object/Semanticable";
import StoreMap from "./StoreMap.js";

export default class StoreMapSemanticable extends StoreMap<string, Semanticable> {

    public constructor() {
        super();
    }

    public setSemanticable<T extends Semanticable>(semanticObject: T): void {
        const semanticId: string = semanticObject.getSynchronizedResourceUrl();
        if (semanticId !== "")
            super.set(semanticId, semanticObject);
    }

    public setAll(semanticObjects: Array<Semanticable>): void {
        semanticObjects.forEach(semanticObject => this.setSemanticable(semanticObject));
    }
    
}
