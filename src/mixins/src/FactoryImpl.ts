import { AnyConstructor, DocumentConstructor, DocumentImplFactory, DocumentWithDestructiveOperations, Loader, MixinFactory, Thing } from "@semantizer/types";

export class FactoryImpl implements MixinFactory {

    private _DocumentImpl: DocumentConstructor<Thing, Thing>;
    private _documentImplFactory: DocumentImplFactory;

    constructor(DocumentImpl: DocumentConstructor<Thing, Thing>, documentImplFactory: DocumentImplFactory) { 
        this._DocumentImpl = DocumentImpl;
        this._documentImplFactory = documentImplFactory;
    }
    
    public create<T extends DocumentWithDestructiveOperations>(uri: string, callback: (impl: DocumentConstructor) => AnyConstructor<T>): T {
        const Impl = callback(this._DocumentImpl);
        return new Impl(this._documentImplFactory);
    }

    public async load<T extends DocumentWithDestructiveOperations>(uri: string, callback: (impl: DocumentConstructor) => AnyConstructor<T>, loader?: Loader): Promise<T> {
        if (!loader)
            throw new Error;
        return loader.load<T>(uri, this, callback);
    }

}