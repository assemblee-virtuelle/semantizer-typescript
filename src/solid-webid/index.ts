import { DatasetCore } from "@rdfjs/types"; // TODO: pb if deleted
import { Dataset, Loader, Semantizer } from "@semantizer/types";
import WebIdProfileMixin, { WebIdProfile, WebIdProfileConstructor } from "@semantizer/webid";
import { TypeIndex, TypeIndexFactory } from "@semantizer/typeindex";

type DatasetConstructor = new (...args: any[]) => Dataset;

export interface SolidWebIdProfileNonDestructiveOperations {
    getPublicTypeIndex(): TypeIndex; // | undefined;
    getSeeAlso(): Dataset; // SolidWebIdProfile;
    loadExtendedProfile(loader?: Loader): Promise<void>;
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

        public getPublicTypeIndex(): TypeIndex {
            const dataset = this.getObject(context.solid + "publicTypeIndex");
            return this.getSemantizer().build(TypeIndexFactory, dataset);
        }

        public getSeeAlso(): Dataset {
            return this.getObject('http://www.w3.org/2000/01/rdf-schema#seeAlso');
        }

        public async loadExtendedProfile(loader?: Loader): Promise<void> {
            await this.load(this.getSeeAlso(), { loader });
        }

    }

}

export function SolidWebIdProfileFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(SolidWebIdProfileMixin, WebIdProfileMixin(_DatasetImpl));
}

export default SolidWebIdProfileFactory;