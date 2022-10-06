import Semanticable from "./Semanticable";

export default interface Propertyable {

    getName(): string;
    getValue(): string | number | boolean | Semanticable | string[] | number[] | boolean[] | IterableIterator<Semanticable> | undefined;

}