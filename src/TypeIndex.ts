import Document from "./Document";
import Thing from "./Thing";
import TypeIndexRegistration from "./TypeIndexRegistration";

export default interface TypeIndex extends Document<TypeIndexRegistration, Thing> {
    createRegistration(forClass?: string, nameHintOrUri?: string): TypeIndexRegistration;
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void;
}