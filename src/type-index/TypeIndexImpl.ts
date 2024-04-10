import { Constructor, Document, DocumentBase } from "../core/Document";
import DocumentDecorated from "../core/DocumentDecorated";
import { TypeIndex, WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";

type TypeIndexRegistrationThing = TypeIndexRegistration<TypeIndexDocument>;
type TypeIndexDocument = TypeIndex<TypeIndexRegistrationThing, TypeIndexRegistrationThing>;
//type Doc = Document<TypeIndexRegistrationThing, TypeIndexRegistrationThing>;

export class TypeIndexImplReadOrWrite//<
    // ContainedThing extends TypeIndexRegistration<any> | TypeIndexRegistrationReadonly,
    // SelfDescribingThing extends ThingBase<any> | ThingReadonly<any>
    //DocumentType extends Document<any, any> | DocumentReadonly<any, any>
//>
extends DocumentDecorated<Document<TypeIndexRegistrationThing, TypeIndexRegistrationThing>>//TypeIndex<ContainedThing, SelfDescribingThing>> 
implements WithReadOperations<TypeIndexRegistrationThing> {
    
    public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistrationThing, index?: number, array?: TypeIndexRegistrationThing[]) => void, thisArg?: any): void {
        this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
    }

}

export class TypeIndexImpl//<
    //ContainedThing extends TypeIndexRegistration = TypeIndexRegistration, //<Statement<TypeIndex>>, 
    //SelfDescribingThing extends ThingBase<any> = Thing<TypeIndex>
//>
extends TypeIndexImplReadOrWrite 
implements WithWriteOperations<TypeIndexRegistrationThing> {
    
    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistrationThing {
        const registration = this.createThingWithUri(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }

}

export function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexImpl; //<TypeIndexRegistration/*<Statement<TypeIndex>>*/, ThingOfDocument<TypeIndex>>;
}

export function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexImplReadOrWrite;//<TypeIndexReadonly>; //<TypeIndexRegistrationReadonly, ThingReadonly<TypeIndexReadonly>>>;
}

// const factory = new FactoryImpl();

// const test = new DocumentImpl<TypeIndexRegistrationThing, TypeIndexRegistrationThing>(factory) as Document<any, any>;

// //const typeIndexDefaultInstance = new TypeIndexImpl<TypeIndexRegistration, ThingOfDocument<TypeIndex>>(new DocumentImpl<ThingOfDocument<TypeIndex>, ThingOfDocument<TypeIndex>>(factory));
// const typeIndexDefaultInstance = new TypeIndexImpl(new DocumentImpl<TypeIndexRegistrationThing, TypeIndexRegistrationThing>(factory));
// typeIndexDefaultInstance.forEachOfClass("", (t => {}));
// typeIndexDefaultInstance.createRegistration();

// // const typeIndexDefaultInstanceReadonly = new TypeIndexImplReadOrWrite(new DocumentImpl<TypeIndexRegistrationReadonly, ThingReadonly<TypeIndexReadonly>>(factory));
// // typeIndexDefaultInstance.deleteContext();
// // typeIndexDefaultInstanceReadonly.forEachOfClass("", (t => {}));

// const got = typeIndexDefaultInstance.get("")
// got?.removeForClass("");

// // const gotReadonly = typeIndexDefaultInstanceReadonly.get("");
// // gotReadonly?.getForClass();

// const WithRead = TypeIndexMixin(DocumentImpl<TypeIndexRegistrationThing, TypeIndexRegistrationThing>);
// const mixWithRead = new WithRead(new DocumentImpl<TypeIndexRegistrationThing, TypeIndexRegistrationThing>(factory));
// mixWithRead.deleteContext();
// mixWithRead.createRegistration("").addInstance("");

// // const ReadOnly = TypeIndexMixinReadonly(DocumentImpl<TypeIndexRegistrationReadonly, ThingReadonly<TypeIndexReadonly>>);

// // // TODO: a contraindre dans la factory
// // const mixReadOnly = new ReadOnly(new DocumentImpl<TypeIndexRegistrationReadonly, ThingReadonly<TypeIndexReadonly>>(factory)) as TypeIndexReadonly;
// // // @ts-expect-error
// // mixReadOnly.deleteContext();
