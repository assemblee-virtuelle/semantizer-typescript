import { DatasetCore, Quad } from "@rdfjs/types";
import { ThingCollection } from "./Collection";
import { Resource } from "./Common";
import { DatasetSemantizer } from "./Datasets";

export type DocumentConstructor = new (...args: any[]) => DatasetCore<Quad, Quad>;

export interface Document { // extends ThingCollection, Resource {
    getDataset(): DatasetSemantizer;
}

export default Document;