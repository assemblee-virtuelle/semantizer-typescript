import { DatasetSemantizer, DatasetSemantizerMixinConstructor, Loader, Semantizer } from "@semantizer/types";
import { SolidWebId, SolidWebIdProfile } from "./types";
import { TypeIndex, typeIndexFactory } from "@semantizer/mixin-typeindex";
import { Dataset } from "@rdfjs/types"; // PB if deleted

const ns = {
    solid: 'http://www.w3.org/ns/solid/terms#',
    ldp: 'http://www.w3.org/ns/ldp#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    pim: 'http://www.w3.org/ns/pim/space#',
    foaf: 'http://xmlns.com/foaf/0.1/'
}

export function SolidWebIdProfileMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {
    return class SolidWebIdProfileImpl extends Base implements SolidWebIdProfile {
        
        public async loadExtendedProfile(loader?: Loader): Promise<void> {
            for (const profile of this.getPrimaryTopic().getSeeAlsoAll()) {
                await this.load(profile, { loader });
            }
        }

        public getPrimaryTopic(): SolidWebId {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode(ns.foaf + 'primaryTopic');
            const webId = this.getLinkedObject(predicate); // TODO: add a param to apply a mixin?
            
            if (webId) {
                return this.getSemantizer().build(solidWebIdFactory, webId);
            }
            
            throw new Error("Missing primary topic");
        }

    }
}

// const dataFactory = (dataset: DatasetSemantizer) => dataset.getSemantizer().getConfiguration().getRdfDataModelFactory();
// const namedNode = (dataset: DatasetSemantizer) => dataFactory(dataset).namedNode;
// const p = namedNode(this)(ns.ldp + 'inbox');

export function SolidWebIdMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {
    return class SolidWebIdImpl extends Base implements SolidWebId {
        
        public getPreferencesFile(): DatasetSemantizer | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode(ns.pim + 'preferencesFile');
            return this.getLinkedObject(predicate);
        }
        
        public getLdpInbox(): DatasetSemantizer | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode(ns.ldp + 'inbox');
            return this.getLinkedObject(predicate);
        }
        
        public getStorageAll(): DatasetSemantizer[] {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode(ns.pim + 'storage');
            return this.getLinkedObjectAll(predicate);
        }

        public getPublicTypeIndex(): TypeIndex | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode(ns.solid + 'publicTypeIndex');
            const dataset = this.getLinkedObject(predicate);
            return this.getSemantizer().build(typeIndexFactory, dataset);
        }

        public getSeeAlsoAll(): DatasetSemantizer[] {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode(ns.rdfs + 'seeAlso');
            return this.getLinkedObjectAll(predicate);
        }

    }

}

export function solidWebIdProfileFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getConfiguration().getDatasetImpl();
    return semantizer.getMixinFactory(SolidWebIdProfileMixin, _DatasetImpl);
}

export function solidWebIdFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(SolidWebIdMixin);
}

// export const sf = makeMixinFactory(SolidWebIdMixin);

// function makeMixinFactory(mixin: any) {
//     return (semantizer: Semantizer) => semantizer.getMixinFactory(mixin);
// }