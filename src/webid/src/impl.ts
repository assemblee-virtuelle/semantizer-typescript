import { DocumentWithDestructiveOperationsConstructor, Thing } from "@semantizer/types";
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