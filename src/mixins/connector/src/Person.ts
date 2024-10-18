import { SolidWebIdProfile, SolidWebIdProfileConstructor, SolidWebIdProfileMixin } from "@semantizer/mixin-solid-webid";
import { Semantizer } from "@semantizer/types";
import { Enterprise, enterpriseFactory } from "./Enterprise.js";
import { WebIdProfileMixin } from "@semantizer/mixin-webid";

export type Person = SolidWebIdProfile & PersonOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface PersonOperations {
    getName(): string | undefined;
    getAffiliatedEnterprises(): Enterprise[];
}

export function PersonMixin<
    TBase extends SolidWebIdProfileConstructor
>(Base: TBase) {

    return class PersonMixinImpl extends Base implements PersonOperations {

        public getName(): string | undefined {
            // const webId = this.getPrimaryTopic();
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode(DFC + 'name');
            return this.getLiteral(this.getOrigin()!, predicate)?.value;
        }

        /**
         * TODO: find why we can't call this.getPrimaryTopic
         */
        public getAffiliatedEnterprises(): Enterprise[] {
            // const webId = this.getPrimaryTopic();
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode(DFC + 'affiliatedBy');
            return this.getLinkedObjectAll(predicate).map(d => this.getSemantizer().build(enterpriseFactory, d));
        }

    }

}

export function personFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getConfiguration().getDatasetImpl();
    return semantizer.getMixinFactory(PersonMixin, SolidWebIdProfileMixin(WebIdProfileMixin(_DatasetImpl)));
}

export function createPerson(semantizer: Semantizer, params?: { name?: string }): Person {
    const person = semantizer.build(personFactory);
    const dataFactory = semantizer.getConfiguration().getRdfDataModelFactory();

    if (params) {
        if (params.name) {
            person.add(
                dataFactory.quad(
                    dataFactory.namedNode(""),
                    dataFactory.namedNode(DFC + 'name'),
                    dataFactory.literal(params.name)
                )
            );
        }
    }
    
    return person;
}