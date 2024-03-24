import DatasetExt from "rdf-ext/lib/Dataset";
import Semantizer from "./Semantizer";
import Thing from "./Thing";
import Resource from "./Resource";

export interface Document extends Resource {
    getSemantizer(): Semantizer;

    isEmpty(): boolean;
    countThings(): number;
    getThing(uri: string): Thing | null;
    getAllThings(): Thing[];
    createThing(): Thing;
    removeThing(): void;
    countStatementsAbout(subject: string | Resource, property?: string): number;
    hasStatementsAbout(subject: string | Resource, property: string, ...hasValues: string[]): boolean;
    filter(by: (subject?: string | Thing | Resource, property?: string, value?: string) => boolean): Thing;

    toRdfDatasetExt(): DatasetExt;
}

export default Document;