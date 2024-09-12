import { Dataset, Thing, Loader } from "@semantizer/types";
import { WebIdProfile } from "./types";
import { DatasetCore, Quad } from "@rdfjs/types"; // TODO: PB if commented

type DatasetConstructor = new (...args: any[]) => Dataset;

export function WebIdProfileMixin<
    TBase extends new (...args: any[]) => Dataset
>(Base: TBase) {
    return class WebIdProfileImpl extends Base implements WebIdProfile {
        // public constructor(...args: any[]) {
        //     super(...args);
        // }

        // étend le type, pas les données membres. Ca doit passer
        // par les constructeur.

        public getMaker(): Thing {
            throw new Error("Method not implemented.");
        }
        
        // TODO: add param: document?: AllGraphs | DefaultGraph | NamedNode | string?
        public getPrimaryTopic(): Dataset {
            return this.getObject('http://xmlns.com/foaf/0.1/primaryTopic');
        }
    }
}

export class WebIdProfileFactory {

    public static async load(resource: string, loader: Loader, impl: DatasetConstructor): Promise<WebIdProfile> {
        const dataset = this.build(impl, await loader.load(resource));
        dataset.setUri(resource);
        return dataset;
    }

    public static build(impl: DatasetConstructor, datasetCore?: DatasetCore): WebIdProfile {
        const DatasetMixinImpl = WebIdProfileMixin(impl);
        return new DatasetMixinImpl(datasetCore);
    }

}

export default WebIdProfileFactory;

// const primaryTopic = this.getStatementAboutSelf("http://xmlns.com/foaf/0.1/primaryTopic")?.getValue();
// return this.getThing(primaryTopic!);