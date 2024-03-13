import Semanticable from "../core/Semanticable";
import StoreMap from "./StoreMap.js";
export default class StoreMapSemanticable extends StoreMap<string, Semanticable> {
    constructor();
    setSemanticable<T extends Semanticable>(semanticObject: T): void;
    setAll(semanticObjects: Array<Semanticable>): void;
}
//# sourceMappingURL=StoreMapSemanticable.d.ts.map