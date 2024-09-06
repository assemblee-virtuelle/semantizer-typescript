import { SolidWebIdProfile, SolidWebIdProfileConstructor, SolidWebIdProfileMixin, SolidWebIdProfileFactory } from "@semantizer/solid-webid";
import { Enterprise } from "./Enterprise.js";
import { DatasetCore } from "@rdfjs/types"; // PB if deleted
import { Dataset, Semantizer } from "@semantizer/types";
import { WebIdProfileMixin } from "@semantizer/webid";

export type Person = SolidWebIdProfile & PersonOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface PersonOperations {
    getName(): string | undefined;
    getAffiliatedEnterprises(): Dataset[]; //Enterprise[];
}

export function PersonMixin<
    TBase extends SolidWebIdProfileConstructor //& ConnectorConstructor
>(Base: TBase) {

    return class PersonMixinImpl extends Base implements PersonOperations {

        public getName(): string | undefined {
            return this.getLiteral(this.getUri()!, DFC + 'name'); // getPrimaryTopic ?
        }

        public getAffiliatedEnterprises(): Dataset[] {
            return this.getObjectAll(DFC + 'affiliatedBy');
        }

    }

}

// export class PersonFactory {

//     // public static async load(resource: string, loader: Loader, impl: WebIdProfileConstructor): Promise<SolidWebIdProfile> {
//     //     const dataset = this.build(impl, await loader.load(resource));
//     //     dataset.setUri(resource);
//     //     return dataset;
//     // }

//     // public static mixIn(impl: SolidWebIdProfileConstructor, dataset?: Dataset): Person {
//     //     const MixinImpl = PersonMixin(SolidWebIdProfileMixin(impl));
//     //     const person = new MixinImpl(dataset);
//     //     if (dataset && dataset.getUri())
//     //         person.setUri(dataset.getUri()!);
//     //     return person;
//     // }

// }

export function PersonFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    // return semantizer.getFactory(SolidWebIdProfileMixin, WebIdProfileMixin(_DatasetImpl));
    return semantizer.getFactory(PersonMixin, SolidWebIdProfileMixin(WebIdProfileMixin(_DatasetImpl)));
}

export default PersonFactory;