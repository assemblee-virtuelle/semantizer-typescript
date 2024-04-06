import DocumentDefaultImpl from "../core-default/DocumentDefaultImpl";
import { ThingDefaultImpl } from "../core-default/ThingDefaultImpl";
import Document, { DocumentReadonly } from "../core/Document";
import Thing from "../core/Thing";
import TypeIndex, { ReadonlyTypeIndex } from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
import TypeIndexRegistrationDefaultImpl from "./TypeIndexRegistrationDefaultImpl";

type Constructor<T = {}> = new (...args: any[]) => T;

export function ReadonlyTypeIndexMixin<TBase extends Constructor<DocumentReadonly<any, any>>>(Base: TBase) {
    return class TypeIndexDefaultImpl extends Base implements ReadonlyTypeIndex {

        public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void {
            //this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
        }

    }
}

export function TypeIndexMixin<TBase extends Constructor<Document<any, any>>>(Base: TBase) {
    return class TypeIndexDefaultImpl extends Base implements TypeIndex {

        public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistration {
            const registration = this.createThingWithUri(nameHintOrUri);
            if (forClass)
                registration.addForClass(forClass);
            return registration;
        }

        public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void {
            //this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
        }

    }
}

export default TypeIndexMixin;

const TypeIndexDefault = TypeIndexMixin(DocumentDefaultImpl<TypeIndexRegistration, Thing>);
const t = new TypeIndexDefault();
const r = t.find((v: TypeIndexRegistration) => v.getForClass() === "");
t.splice(0)
//t.equals()