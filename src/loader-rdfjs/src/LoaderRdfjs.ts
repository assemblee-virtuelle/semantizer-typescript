import rdfjsFetch from '@rdfjs/fetch';
import { DatasetCore, Quad } from "@rdfjs/types";
import { Document, DocumentLoadOptions, DocumentFactory, Loader, Thing } from "@semantizer/types";

export class LoaderRdfjs implements Loader {

    public async load<DocumentType extends Document<any, any> = Document<Thing, Thing>>(uri: string, factory: DocumentFactory<DocumentType>, options?: DocumentLoadOptions): Promise<DocumentType> {
        const response = await rdfjsFetch<DatasetCore<Quad>, Quad, Quad>(uri);
        const dataset: DatasetCore<Quad> = await response.dataset();
        const document = factory.create();
        for (const quad of dataset) {
            if (quad.subject.value === uri.split('#')[0])
                document.createStatementAboutSelf(quad.predicate.value, quad.object.value);
            else document.createStatement(quad.subject.value, quad.predicate.value, quad.object.value);
        }
        return document;
    }

}

export default LoaderRdfjs;