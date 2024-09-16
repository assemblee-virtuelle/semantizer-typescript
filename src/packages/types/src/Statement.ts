import { Quad, Term } from "@rdfjs/types";
import { DatasetSemantizer } from "./Datasets";
import Thing from "./Thing";

export interface Statement extends Quad {
    getTermType(): string;
    getValue(): string;
    getSubject(): Term;
    getPredicate(): Term;
    getObject(): Term;
    getGraph(): Term;
    getDataset(): DatasetSemantizer;
    getDocument(): Document;
    getThing(): Thing;
}

export default Statement;