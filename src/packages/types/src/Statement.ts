import { Quad, Term } from "@rdfjs/types";
import { Dataset } from "./Dataset";
import Thing from "./Thing";

export interface Statement extends Quad {
    getTermType(): string;
    getValue(): string;
    getSubject(): Term;
    getPredicate(): Term;
    getObject(): Term;
    getGraph(): Term;
    getDataset(): Dataset;
    getDocument(): Document;
    getThing(): Thing;
}

export default Statement;