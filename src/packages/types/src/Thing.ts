import { DatasetCore, Quad } from "@rdfjs/types";
import { StatementCollection } from "./Collection";
import { DatasetSemantizer } from "./Datasets";

export type ThingConstructor = new (...args: any[]) => DatasetCore<Quad, Quad>;

export interface Thing { // extends StatementCollection {
    getDataset(): DatasetSemantizer;
    getDocument(): Document;
}

export default Thing;