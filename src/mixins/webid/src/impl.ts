import { DatasetSemantizer, NamedNode, Resource, Semantizer, DatasetSemantizerMixinConstructor } from "@semantizer/types";
import { WebIdProfile } from "./types";
import { DatasetCore  } from "@rdfjs/types"; // TODO: PB if commented

export function WebIdProfileMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {
    return class WebIdProfileImpl extends Base implements WebIdProfile {

        public getMaker(): DatasetSemantizer | undefined {
            throw new Error("Method not implemented.");
        }
        
        // TODO: add param to get as a particular obj
        public getPrimaryTopic(thing?: Resource, graph?: NamedNode): DatasetSemantizer | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('http://xmlns.com/foaf/0.1/primaryTopic');
            return this.getLinkedObject(predicate, thing, graph);
            // return linkedObject ? this.getSemantizer().build(linkedObject, mixinFactory) : undefined;
        }
    }
}

export function webIdFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(WebIdProfileMixin);
}

export default webIdFactory;