import { SolidWebIdProfile, SolidWebIdProfileConstructor, SolidWebIdProfileMixin } from "@semantizer/mixin-solid-webid";
import { Semantizer } from "@semantizer/types";
import { Enterprise, enterpriseFactory } from "./Enterprise.js";
import { WebIdProfileMixin } from "@semantizer/mixin-webid";
import { LiteralHelperAddMixin, WithLiteralHelperAdd } from "@semantizer/mixin-literal-helper-add";

export type Person = SolidWebIdProfile & PersonOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface PersonOperations {
    getName(): string | undefined;
    getAffiliatedEnterprises(): Enterprise[];
}

export interface PersonCreateParams {
    name?: string;
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

export function personWithHelperLiteralAddFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getConfiguration().getDatasetImpl();
    return semantizer.getMixinFactory(PersonMixin, LiteralHelperAddMixin(SolidWebIdProfileMixin(WebIdProfileMixin(_DatasetImpl))));
}

export function createPerson(semantizer: Semantizer, params?: PersonCreateParams): Person {
    const person = semantizer.build(personWithHelperLiteralAddFactory);
    const dataFactory = semantizer.getConfiguration().getRdfDataModelFactory();

    const subject = dataFactory.namedNode("");
    const namePredicate = dataFactory.namedNode(DFC + 'name');

    if (params) {
        if (params.name) {
            person.addStringNoLocale(subject, namePredicate, params.name);
        }
    }
    
    return person;
}