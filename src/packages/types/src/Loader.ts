import { DatasetCore, Quad, Stream } from "@rdfjs/types";

export interface Loader {
    load(uri: string): Promise<DatasetCore<Quad, Quad>>;
}

export interface LoaderQuadStream {
    load(uri: string): Promise<Stream<Quad>>;
}