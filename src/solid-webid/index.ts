import { DatasetCore } from "@rdfjs/types";
import { Dataset, Loader, Semantizer } from "@semantizer/types";
import WebIdProfileMixin, { WebIdProfile, WebIdProfileConstructor } from "@semantizer/webid";
import { DatasetMixin } from "@semantizer/core-rdfjs";

type DatasetConstructor = new (...args: any[]) => Dataset;

export interface SolidWebIdProfileNonDestructiveOperations {
    getPublicTypeIndex(): Dataset; // TypeIndex | undefined;
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

        public getPublicTypeIndex(): Dataset {
            return this.getObject(context.solid + "publicTypeIndex");
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

// type Constructor<T> = new (...args: any[]) => T;
// type DConstructor<T = {}> = new (datasetCore?: DatasetCore) => T;
// type Constructor<T = {}> = new (...args: any[]) => T;
// type Constructor<T extends Dataset> = new (...args: any[]) => T;

// type Implements<M extends Constructor<M>> = InstanceType<
//   ReturnType<typeof M>
// >;

// type Mixin<T extends Dataset> = (Base: Constructor<T>) => Constructor<T>;
// type Mixin<TBase extends Dataset, U extends TBase> = (Base: Constructor<TBase>) => Constructor<TBase & U>;
// type Mixin<TBase extends Dataset> = (Base: Constructor<TBase>) => Constructor<TBase & any>;
// type Mixin<TBase extends Dataset> = (Base: TBase) => TBase;

// type TBase<M extends Mixin<any>> = InstanceType<ReturnType<M>>;

// export class MixinFactory<
//     // MixedInType extends Dataset, // WebIdProfile
//     MixinImpl extends Mixin<any> // SolidWebIdProfileMixin
// > {

//     private _mixin: Mixin<InstanceType<ReturnType<MixinImpl>>>; //, ReturnedType>;
//     private _impl: TBase<MixinImpl>;

//     constructor(mixin: Mixin<InstanceType<ReturnType<MixinImpl>>>, impl: TBase<MixinImpl>) { //}, ReturnedType>) {
//         this._impl = impl;
//         this._mixin = mixin;
//     }

//     public async load(resource: string, loader: Loader): Promise<InstanceType<ReturnType<MixinImpl>>> {
//         const dataset = this.build(await loader.load(resource));
//         dataset.setUri(resource);
//         return dataset;
//     }

//     public build(datasetCore?: DatasetCore): InstanceType<ReturnType<MixinImpl>> {
//         const DatasetMixinImpl = this._mixin(this._impl);
//         return new DatasetMixinImpl(datasetCore);
//     }

// }

// export class SolidWebIdProfileFactory {

//     public async load(resource: string, loader: Loader, impl: WebIdProfileConstructor): Promise<SolidWebIdProfile> {
//         const dataset = this.build(impl, await loader.load(resource));
//         dataset.setUri(resource);
//         return dataset;
//     }

//     public build(impl: WebIdProfileConstructor, datasetCore?: DatasetCore): SolidWebIdProfile {
//         const DatasetMixinImpl = SolidWebIdProfileMixin(impl);
//         return new DatasetMixinImpl(datasetCore);
//     }

// }

// const SolidWebIdProfileFactory = new MixinFactory()