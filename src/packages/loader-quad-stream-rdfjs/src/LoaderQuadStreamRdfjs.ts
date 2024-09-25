import rdfjsFetch from '@rdfjs/fetch';
import { DatasetCoreRdfjs, Quad, LoaderQuadStream, Stream } from "@semantizer/types";

export class LoaderQuadStreamRdfjs implements LoaderQuadStream {

    public async load(uri: string): Promise<Stream<Quad>> {
        console.log("[LoaderQuadStreamRdfjs] loading", uri);
        const response = await rdfjsFetch<DatasetCoreRdfjs<Quad>, Quad, Quad>(uri);
        return response.quadStream();
    }

}