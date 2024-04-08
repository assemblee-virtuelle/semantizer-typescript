import { DocumentBaseDefaultImpl, DocumentDecoratedDefaultImpl, DocumentDefaultImpl, DocumentReadonlyDefaultImpl } from "../core-default/DocumentDefaultImpl";
import { ThingDefaultImpl } from "../core-default/ThingDefaultImpl";
import Document, { DocumentReadonly, DocumentBaseReadonly } from "../core/Document";
import Thing, { ThingReadonly } from "../core/Thing";
import TypeIndex, { TypeIndexReadonly, TypeIndexBase, TypeIndexBaseReadonly } from "./TypeIndex";
import TypeIndexRegistration, { TypeIndexRegistrationReadonly } from "./TypeIndexRegistration";
import TypeIndexRegistrationDefaultImpl from "./TypeIndexRegistrationDefaultImpl";

type Constructor<T = {}> = new (...args: any[]) => T;

export function ReadonlyTypeIndexMixin<TBase extends Constructor<DocumentReadonly<TypeIndexReadonly>>>(Base: TBase) {
    return class TypeIndexDefaultImpl extends Base implements TypeIndexReadonly {

        public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void {
            //this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
        }

    }
}

export function TypeIndexMixin<TBase extends Constructor<Document<TypeIndex>>>(Base: TBase) {
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

const TypeIndexWritable = TypeIndexMixin(DocumentDefaultImpl<TypeIndex>);
const ti = new TypeIndexWritable();
const obj = ti.pop();
const added = ti.add(obj!);

const TypeIndexReadonly = ReadonlyTypeIndexMixin(DocumentReadonlyDefaultImpl<TypeIndexReadonly>);
const base = new DocumentBaseDefaultImpl<TypeIndexRegistrationReadonly, ThingReadonly>();
const baseReadonly = new DocumentReadonlyDefaultImpl<TypeIndexBaseReadonly>(base);

const tir = new TypeIndexReadonly(baseReadonly);

const test = new DocumentReadonlyDefaultImpl<TypeIndexReadonly>();
test.toCopy();

const r = test.get("");
r?.getForClass()

const TypeIndexDefault = ReadonlyTypeIndexMixin(DocumentReadonlyDefaultImpl<TypeIndexReadonly>);
const t = new TypeIndexDefault();
const tiw = t.toCopyWritable();
// const r = t.find((v: TypeIndexRegistration) => v.getForClass() === "");
// t.splice(0)
//t.equals()