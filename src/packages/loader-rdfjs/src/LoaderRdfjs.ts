import rdfjsFetch from '@rdfjs/fetch';
import { DatasetCoreRdfjs, Quad, Loader } from "@semantizer/types";

export class LoaderRdfjs implements Loader {

    public async load(uri: string): Promise<DatasetCoreRdfjs<Quad, Quad>> {
        console.log("[LoaderRdfjs] loading", uri);
        const response = await rdfjsFetch<DatasetCoreRdfjs<Quad>, Quad, Quad>(uri);
        return await response.dataset();
    }

}