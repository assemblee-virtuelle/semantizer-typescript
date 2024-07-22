import { WebIdProfile, WebIdProfileConstructor } from "@semantizer/webid";

export interface SolidWebIdProfileNonDestructiveOperations {
    getPublicTypeIndexUri(): string | undefined;
}

export type SolidWebIdProfile = WebIdProfile & SolidWebIdProfileNonDestructiveOperations;
export type SolidWebIdProfileConstructor = new (...args: any[]) => SolidWebIdProfile;

const context = {
    solid: "http://www.w3.org/ns/solid/terms#",
    pim: "http://www.w3.org/ns/pim/space#",
    ldp: "http://www.w3.org/ns/ldp#",
    publicTypeIndex: "solid:publicTypeIndex"
}

export function SolidWebIdProfileMixin<
    TBase extends WebIdProfileConstructor
>(Base: TBase) {
    return class SolidWebIdProfileImpl extends Base implements SolidWebIdProfile {

        public constructor(...args: any[]) {
            super(...args);
        }

        public getPublicTypeIndexUri(): string | undefined {
            const primaryTopic = this.getPrimaryTopic();
            return primaryTopic.getStatement(context.solid + "publicTypeIndex")?.getValue();
        }

    }

}

export default SolidWebIdProfileMixin;