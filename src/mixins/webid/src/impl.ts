import { DatasetSemantizer, NamedNode, Resource, Semantizer, DatasetSemantizerMixinConstructor } from "@semantizer/types";
import { WebIdProfile } from "./types";
import { DatasetCore,  } from "@rdfjs/types"; // TODO: PB if commented

export function WebIdProfileMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {
    return class WebIdProfileImpl extends Base implements WebIdProfile {

        public getMaker(): DatasetSemantizer | undefined {
            throw new Error("Method not implemented.");
        }
        
        public getPrimaryTopic(thing?: Resource, graph?: NamedNode): DatasetSemantizer | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('http://xmlns.com/foaf/0.1/primaryTopic');
            return this.getLinkedObject(predicate, thing, graph);
        }
    }
}

export function webIdFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getConfiguration().getDatasetImpl();
    return semantizer.getMixinFactory(WebIdProfileMixin, _DatasetImpl); // TODO: remove the second param?
}

export default webIdFactory;

// const primaryTopic = this.getStatementAboutSelf("http://xmlns.com/foaf/0.1/primaryTopic")?.getValue();
// return this.getThing(primaryTopic!);