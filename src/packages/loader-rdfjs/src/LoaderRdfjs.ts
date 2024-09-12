import rdfjsFetch from '@rdfjs/fetch';
import { DatasetCore, Quad } from "@rdfjs/types";
import { Loader } from "@semantizer/types";

export class LoaderRdfjs implements Loader {

    public async load(uri: string): Promise<DatasetCore<Quad, Quad>> {
        console.log("[LoaderRdfjs] loading", uri);
        const response = await rdfjsFetch<DatasetCore<Quad>, Quad, Quad>(uri);
        return await response.dataset();
        // const dataset: DatasetCore<Quad> = await response.dataset();
        // const document = factory.create<T>(uri, callback);
        // for (const quad of dataset) {
        //     if (quad.subject.value === uri.split('#')[0])
        //         document.createStatementAboutSelf(quad.predicate.value, quad.object.value);
        //     else document.createStatement(quad.subject.value, quad.predicate.value, quad.object.value);
        //     // document.createStatementAnonymous(quad.subject.value, "b0", )
        // }
        // return document;
    }

}

export default LoaderRdfjs;