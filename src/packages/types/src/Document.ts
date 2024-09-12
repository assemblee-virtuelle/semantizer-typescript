import { DatasetCore, Quad } from "@rdfjs/types";
import { ThingCollection } from "./Collection";
import { Resource } from "./Common";
import { Dataset } from "./Dataset";

export type DocumentConstructor = new (...args: any[]) => DatasetCore<Quad, Quad>;

export interface Document { // extends ThingCollection, Resource {
    getDataset(): Dataset;
}

export default Document;