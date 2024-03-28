import DocumentAbstractDefaultImpl from "./DocumentDefaultImpl";
import Thing from "./Thing";
import TypeIndex from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
export default class TypeIndexDefault extends DocumentAbstractDefaultImpl<TypeIndexRegistration, Thing> implements TypeIndex {
    createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistration;
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void;
}
//# sourceMappingURL=TypeIndexDefault.d.ts.map