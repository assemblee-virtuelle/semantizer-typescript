import datasetFactory from '@rdfjs/dataset';
import rdfjsFetch from '@rdfjs/fetch';
import { DatasetCore, Quad } from "@rdfjs/types";
import { Document, Thing, Statement } from "@virtual-assembly/semantizer-core";
import DocumentRdfjs from './DocumentRdfjs.js';

interface DocumentLoadOptions {
    loadSeeAlso?: boolean;
    seeAlsoMaxDepth?: number;
}

export class SemantizerRdfjs {

    public static async loadDocument<
        ContainedThing extends Thing<any> = Thing<Statement>,
        SelfDescribingThing extends Thing<any> = Thing<Statement>
    >(uri: string, options?: DocumentLoadOptions): Promise<Document<ContainedThing, SelfDescribingThing>> {
        const response = await rdfjsFetch<DatasetCore<Quad>, Quad, Quad>(uri);
        const dataset: DatasetCore<Quad> = await response.dataset();
        return new DocumentRdfjs<ContainedThing, SelfDescribingThing>(dataset);
    }

    public static createDocument<
        ContainedThing extends Thing<any> = Thing<Statement>,
        SelfDescribingThing extends Thing<any> = Thing<Statement>
    >(): Document<ContainedThing, SelfDescribingThing> {
        const dataset = datasetFactory.dataset();
        return new DocumentRdfjs<ContainedThing, SelfDescribingThing>(dataset);
    }

}

export default SemantizerRdfjs;