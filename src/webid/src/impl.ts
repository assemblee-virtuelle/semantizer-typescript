import { DocumentWithDestructiveOperationsConstructor, Thing, ThingConstructor, StatementConstructor, Statement, Factory, Document, DocumentConstructor } from "@semantizer/types";
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
            throw new Error("Method not implemented.");
        }

    }

}

export class WebIdProfileFactory implements Factory<WebIdProfile> {

    private _DocumentImpl: DocumentConstructor<Thing, Thing>;

    constructor(DocumentImpl: DocumentConstructor<Thing, Thing>) {
        this._DocumentImpl = DocumentImpl;
    }

    public create(): WebIdProfile {
        const WebIdProfileImpl = WebIdProfileMixin(this._DocumentImpl);
        return new WebIdProfileImpl();
    }

} 