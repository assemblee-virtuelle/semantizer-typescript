var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DocumentWithChangelogMixin } from "../changelog/DocumentWithChangelogImpl";
import { DocumentDistantMixin } from "./DocumentSynchronizedImpl";
// type Constructor<T = {}> = new (...args: any[]) => T;
// type MixinFunction<Type extends DocumentBase<any, any>> = <TSuper extends Document<any, any>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;
// type MixinFunctionReadonly<ContainedThingReadonly extends ThingReadonly, SelfDescribingThingReadonly extends ThingReadonly, Type extends DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>> = <TSuper extends DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;
export class SynchronizedDocumentFactoryDefaultImpl {
    // public createWithMixin<Type extends Document<any, any> = Document>(Mixin: MixinFunction<Type>): LocalDocument & Type {
    //     const MixedInLocalDocument = Mixin<LocalDocument & Document<any, any>>(LocalDocumentDefaultImpl);
    //     return new MixedInLocalDocument(new DocumentImpl());
    // }
    // public create<
    //     ContainedThing extends Thing = Thing, 
    //     SelfDescribingThing extends Thing = Thing
    // >(): LocalDocument & Document<ContainedThing, SelfDescribingThing> {
    //     return new LocalDocumentDefaultImpl(new DocumentImpl<ContainedThing, SelfDescribingThing>());
    // }
    static load(uri, DocumentConstructor, fetchFn) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchFunction = fetchFn ? fetchFn : fetch;
            const response = yield fetchFunction(uri);
            // parse the response (take a parser as input?)
            // the parser will produce objects in a particular format (ex: RDFJS)
            // Need to add abstraction on parser.
            // create a document, add things to it.
            const Type = DocumentDistantMixin(DocumentWithChangelogMixin(DocumentConstructor));
            const document = new Type(new DocumentConstructor());
            return document;
        });
    }
}
// const syncFactory = new SynchronizedDocumentFactoryDefaultImpl();
// const localDocument = syncFactory.create();
// const distantDocument = syncFactory.load();
// const localTypeIndex = syncFactory.createWithMixin<TypeIndex>(TypeIndexMixin);
// const distantTypeIndex = syncFactory.loadWithMixin<TypeIndexRegistration, Thing, TypeIndexRegistrationWithNonDestructiveOperations, ThingReadonly, TypeIndex, TypeIndexReadonly>(ReadonlyTypeIndexMixin);
// distantTypeIndex.toLocalCopy();
// localTypeIndex.createRegistration("forClass");
//# sourceMappingURL=SynchronizedDocumentFactoryDefaultImpl.js.map