import { WithChangelog } from "../mixins/changelog/Changelog";
import { DocumentWithChangelogMixin } from "../mixins/changelog/DocumentWithChangelogImpl";
import DocumentImpl from "../core-default/src/DocumentImpl";
import { Constructed, Document, DocumentBase, DocumentWithDestructiveOperationsConstructor } from "../types/src/Document";
import { DistantDocument, LocalDocument } from "./DocumentSynchronized";
import { DocumentDistantMixin } from "./DocumentSynchronizedImpl";

type FetchFunction = (uri: string) => Promise<Response>;

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

    public static async load<
        Constructor extends DocumentWithDestructiveOperationsConstructor<any, any>
    >(uri: string, DocumentConstructor: Constructor, fetchFn?: FetchFunction): Promise<Constructed<Constructor> & WithChangelog & DistantDocument> {
        const fetchFunction = fetchFn? fetchFn: fetch;
        const response = await fetchFunction(uri);
        // parse the response (take a parser as input?)
        // the parser will produce objects in a particular format (ex: RDFJS)
        // Need to add abstraction on parser.
        // create a document, add things to it.
        const Type = DocumentDistantMixin(DocumentWithChangelogMixin(DocumentConstructor));
        const document = new Type(new DocumentConstructor()) as Constructed<Constructor> & WithChangelog & DistantDocument;
        return document;
    }

    // public loadWithMixin<
    //     ContainedThing extends Thing = Thing, 
    //     SelfDescribingThing extends Thing = Thing, 
    //     ContainedThingReadonly extends ThingReadonly = ThingReadonly, 
    //     SelfDescribingThingReadonly extends ThingReadonly = ThingReadonly, 
    //     Type extends Document<ContainedThing, SelfDescribingThing> = Document<ContainedThing, SelfDescribingThing>, 
    //     ReadonlyType extends DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly> = DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>
    // >(Mixin: MixinFunctionReadonly<ContainedThingReadonly, SelfDescribingThingReadonly, ReadonlyType>): DistantDocument<Type> & ReadonlyType {
    //     const MixedInDistantDocument = Mixin<DistantDocument<Type> & DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>>(DistantDocumentDefaultImpl<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly, Type>);
    //     return new MixedInDistantDocument(new DocumentReadonlyDefaultImpl());
    // }

}

// const syncFactory = new SynchronizedDocumentFactoryDefaultImpl();
// const localDocument = syncFactory.create();
// const distantDocument = syncFactory.load();

// const localTypeIndex = syncFactory.createWithMixin<TypeIndex>(TypeIndexMixin);
// const distantTypeIndex = syncFactory.loadWithMixin<TypeIndexRegistration, Thing, TypeIndexRegistrationWithNonDestructiveOperations, ThingReadonly, TypeIndex, TypeIndexReadonly>(ReadonlyTypeIndexMixin);
// distantTypeIndex.toLocalCopy();
// localTypeIndex.createRegistration("forClass");