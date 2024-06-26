import { DocumentWithDestructiveOperationsConstructor, Thing, ThingConstructor, StatementConstructor, Statement, Factory } from "@semantizer/types";
import { WebIdProfile } from "./types";

export function WebIdProfileMixin<
    TBase extends DocumentWithDestructiveOperationsConstructor<Thing, Thing>
>(Base: TBase) {
    return class WebIdProfileImpl extends Base implements WebIdProfile {

        public constructor(...args: any[]) {
            super(...args);
        }

        getMaker(): Thing {
            throw new Error("Method not implemented.");
        }

        getPrimaryTopic(): Thing {
            throw new Error("Method not implemented.");
        }

    }

}

export class WebIdProfileFactory implements Factory<WebIdProfile> {

    private _DocumentImpl: DocumentWithDestructiveOperationsConstructor<Thing, Thing>;
    private _ThingImpl: ThingConstructor<Thing>;
    private _StatementImpl: StatementConstructor<Statement>;

    constructor(DocumentImpl: DocumentWithDestructiveOperationsConstructor<Thing, Thing>, ThingImpl: ThingConstructor<Thing>, StatementImpl: StatementConstructor<Statement>) { 
        this._DocumentImpl = DocumentImpl;
        this._ThingImpl = ThingImpl;
        this._StatementImpl = StatementImpl;
    }

    public create(): WebIdProfile {
        const WebIdProfileImpl = WebIdProfileMixin(this._DocumentImpl);
        return new WebIdProfileImpl(this._ThingImpl, this._ThingImpl, this._StatementImpl);
    }

} 