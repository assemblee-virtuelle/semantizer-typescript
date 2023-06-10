import Semanticable from "../object/Semanticable";

export default interface StoreInterface {
    get(semanticObjectId: string): Promise<Semanticable | undefined>;
    has(semanticObjectId: string): boolean;
    set(semanticObject: Semanticable): void;
    setAll(semanticObjects: Array<Semanticable>): void;
}
