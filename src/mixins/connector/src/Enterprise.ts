import { SolidWebIdProfile, SolidWebIdProfileConstructor, SolidWebIdProfileMixin } from "@semantizer/mixin-solid-webid";
import { Semantizer } from "@semantizer/types";
import { Catalog, catalogFactory } from "./Catalog.js";
import { WebIdProfileMixin } from "@semantizer/mixin-webid";

export type Enterprise = SolidWebIdProfile & EnterpriseOperations;

const DFC = 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#';

export interface EnterpriseOperations {
    getName(): string | undefined;
    getMaintainedCatalogs(): Catalog[];
}

export function EnterpriseMixin<
    TBase extends SolidWebIdProfileConstructor
>(Base: TBase) {

    return class EnterpriseMixinImpl extends Base implements EnterpriseOperations {

        public getName(): string | undefined {
            // const webId = this.getPrimaryTopic();
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode(DFC + 'name');
            return this.getLiteral(this.getOrigin()!, predicate)?.value;
        }

        public getMaintainedCatalogs(): Catalog[] {
            // const webId = this.getPrimaryTopic();
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const predicate = dataFactory.namedNode(DFC + 'maintains');
            return this.getLinkedObjectAll(predicate).map(d => this.getSemantizer().build(catalogFactory, d));
        }

    }

}

export function enterpriseFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getConfiguration().getDatasetImpl();
    return semantizer.getMixinFactory(EnterpriseMixin, SolidWebIdProfileMixin(WebIdProfileMixin(_DatasetImpl)));
}