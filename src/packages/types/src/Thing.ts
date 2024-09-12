import { DatasetCore, Quad } from "@rdfjs/types";
import { StatementCollection } from "./Collection";
import { Dataset } from "./Dataset";

export type ThingConstructor = new (...args: any[]) => DatasetCore<Quad, Quad>;

export interface Thing { // extends StatementCollection {
    getDataset(): Dataset;
    getDocument(): Document;
}

export default Thing;