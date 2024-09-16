import { DatasetWithOrigin, Loader, Resource, Semantizer } from "@semantizer/types";
import { WebIdProfile } from "./types";
import { DatasetCore, NamedNode } from "@rdfjs/types"; // TODO: PB if commented

type DatasetConstructor = new (...args: any[]) => DatasetWithOrigin;

export function WebIdProfileMixin<
    TBase extends new (...args: any[]) => DatasetWithOrigin
>(Base: TBase) {
    return class WebIdProfileImpl extends Base implements WebIdProfile {

        public getMaker(): DatasetWithOrigin | undefined {
            throw new Error("Method not implemented.");
        }
        
        public getPrimaryTopic(thing?: Resource, graph?: string | NamedNode): DatasetWithOrigin | undefined {
            return this.getObject('http://xmlns.com/foaf/0.1/primaryTopic', thing, graph);
        }
    }
}

export function webIdProfileFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(WebIdProfileMixin, _DatasetImpl);
}

export default webIdProfileFactory;

// const primaryTopic = this.getStatementAboutSelf("http://xmlns.com/foaf/0.1/primaryTopic")?.getValue();
// return this.getThing(primaryTopic!);