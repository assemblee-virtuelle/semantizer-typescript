import Semanticable from "../object/Semanticable"
import StoreInterface from "./StoreInterface";

export default class StoreMap implements StoreInterface {

    private storeObject: Map<string, Semanticable>;

    public constructor() {
        this.storeObject = new Map<string, Semanticable>();
    }

    public async get(semanticObjectId: string): Promise<Semanticable | undefined> {
        return this.storeObject.get(semanticObjectId);
    }

    public has(semanticObjectId: string): boolean {
        return this.storeObject.has(semanticObjectId);
    }

    public set(semanticObject: Semanticable): void {
        const semanticId: string = semanticObject.getSemanticId();
        if (semanticId !== "")
            this.storeObject.set(semanticId, semanticObject);
    }

    public setAll(semanticObjects: Array<Semanticable>): void {
        semanticObjects.forEach(semanticObject => this.set(semanticObject));
    }
    
}
