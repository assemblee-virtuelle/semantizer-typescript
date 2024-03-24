import DatasetExt from "rdf-ext/lib/Dataset";
import Semantizer from "./Semantizer";
import Thing from "./Thing";
import Resource from "./Resource";
import Context from "./Context";

export interface ConstructionParameters {
    rdfDataset?: any;
    uri?: string;
    types?: string | string[];
    things?: Thing | Thing[];
    context?: Context;
}

export interface Document extends Resource {
    getContext(): Context | undefined;
    setContext(context: Context): void;
    expand(uri: string): string;
    shorten(uri: string): string;

    isEmpty(): boolean;
    countThings(): number;
    addThing(thing: Thing): Document;
    addDocument(document: Document): Document;
    getThing(uri: string): Thing | null;
    getAllThings(): Thing[];
    createSelfDescribingThing(): Thing;
    createThing(nameHintOrUri?: string): Thing;
    createAnonymousThing(nameHint?: string): Thing;
    deleteThing(): void;
    //countStatementsAbout(subject: string | Resource, property?: string): number;
    hasStatementsAbout(subject: string | Resource, property: string, ...hasValues: string[]): boolean;
    filter(by: (subject?: string | Resource, property?: string, value?: string) => boolean): Thing;

    toRdfDatasetExt(): DatasetExt;
}

export default Document;