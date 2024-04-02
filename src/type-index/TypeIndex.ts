import Document, { DocumentWithReadAndWriteOperations, DocumentWithReadOperations } from "../contracts/Document";
import Thing from "../contracts/Thing";
import TypeIndexRegistration from "./TypeIndexRegistration";

export interface TypeIndex {}

export interface WithReadOperations {
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void;
}

export interface WithWriteOperations {
    createRegistration(forClass?: string, nameHintOrUri?: string): TypeIndexRegistration;
}

export type TypeIndexWithReadOperations = TypeIndex & DocumentWithReadOperations<TypeIndexRegistration, Thing> & WithReadOperations;

export type TypeIndexWithReadAndWriteOperations = TypeIndex & DocumentWithReadAndWriteOperations<TypeIndexRegistration, Thing> & WithReadOperations & WithWriteOperations;

export default TypeIndex;