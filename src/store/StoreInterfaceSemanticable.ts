import Semanticable from "../core/Semanticable";
import StoreInterface from "./StoreInterface";

export default interface StoreInterfaceSemanticable extends StoreInterface<string, Semanticable<void, void, void>> {
    
}