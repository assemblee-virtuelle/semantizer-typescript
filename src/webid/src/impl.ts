import { DocumentConstructor, DocumentFactory, DocumentImplFactory, DocumentWithDestructiveOperationsConstructor, Loader, Thing } from "@semantizer/types";
import { WebIdProfile } from "./types";

export function WebIdProfileMixin<
    TBase extends DocumentWithDestructiveOperationsConstructor<Thing, Thing>
>(Base: TBase) {
    return class WebIdProfileImpl extends Base implements WebIdProfile {

        public constructor(...args: any[]) {
            super(...args);
        }

        public getMaker(): Thing {
            throw new Error("Method not implemented.");
        }

        public getPrimaryTopic(): Thing {
            const primaryTopic = this.getStatementAboutSelf("http://xmlns.com/foaf/0.1/primaryTopic")?.getValue();
            return this.getThing(primaryTopic!);
        }

    }

}

export class WebIdProfileFactory implements DocumentFactory<WebIdProfile> {

    private _DocumentImpl: DocumentConstructor<Thing, Thing>;
    private _documentImplFactory: DocumentImplFactory;

    constructor(DocumentImpl: DocumentConstructor<Thing, Thing>, documentImplFactory: DocumentImplFactory) { 
        this._DocumentImpl = DocumentImpl;
        this._documentImplFactory = documentImplFactory;
    }
    
    public create(): WebIdProfile {
        const WebIdProfileImpl = WebIdProfileMixin(this._DocumentImpl);
        return new WebIdProfileImpl(this._documentImplFactory);
    }

    public async load(webId: string, loader?: Loader): Promise<WebIdProfile> {
        // const loaderDefault = loader? loader: this._semantizer.getDefaultLoader();
        if (!loader)
            throw new Error;
        return loader.load<WebIdProfile>(webId, this);
    }

} 