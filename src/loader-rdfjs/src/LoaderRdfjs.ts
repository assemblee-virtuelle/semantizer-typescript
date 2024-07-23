import rdfjsFetch from '@rdfjs/fetch';
import { DatasetCore, Quad } from "@rdfjs/types";
import { Document, DocumentLoadOptions, DocumentFactory, Loader, Thing, AnyFunction, MixinFactory, Mixin, DocumentWithDestructiveOperations, DocumentConstructor, AnyConstructor, DocumentWithDestructiveOperationsConstructor } from "@semantizer/types";

export class LoaderRdfjs<
    ContainedThing extends Thing<any> = Thing,
    SelfDescribingThing extends Thing<any> = Thing
> implements Loader<ContainedThing, SelfDescribingThing> {

    public async load<T extends DocumentWithDestructiveOperations<ContainedThing, SelfDescribingThing>>(uri: string, factory: MixinFactory<ContainedThing, SelfDescribingThing>, callback: (impl: DocumentConstructor<ContainedThing, SelfDescribingThing>) => AnyConstructor<T>, options?: DocumentLoadOptions): Promise<T> {
        console.log("[LoaderRdfjs] loading", uri);
        const response = await rdfjsFetch<DatasetCore<Quad>, Quad, Quad>(uri);
        const dataset: DatasetCore<Quad> = await response.dataset();
        const document = factory.create<T>(uri, callback);
        for (const quad of dataset) {
            if (quad.subject.value === uri.split('#')[0])
                document.createStatementAboutSelf(quad.predicate.value, quad.object.value);
            else document.createStatement(quad.subject.value, quad.predicate.value, quad.object.value);
        }
        return document;
    }

}

export default LoaderRdfjs;