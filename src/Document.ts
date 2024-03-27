import DatasetExt from "rdf-ext/lib/Dataset";
import Thing from "./Thing";
import Resource from "./Resource";
import Context from "./Context";

export interface Document extends Resource, Iterable<Thing> {
    getContext(): Context | undefined;
    setContext(context: Context): void;
    expand(uri: string): string;
    shorten(uri: string): string;

    isEmpty(): boolean;
    countThings(): number;
    equals(other: Document): boolean;

    addThing(thing: Thing): Document;
    addDocument(document: Document): Document;

    getThing(uri: string): Thing | null;
    getThingsAll(): Thing[]; // delete because use iterator instead?
    // TODO: add forEach and other methods?
    getThingThatSelfDescribes(): Thing | null;

    createThingToSelfDescribe(): Thing;
    createThing(nameHintOrUri?: string): Thing;
    createThingWithoutUri(nameHint?: string): Thing;

    deleteThing(thingOrUri: string | Thing): void;
    //countStatementsAbout(subject: string | Resource, property?: string): number;
    hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean;
    filter(predicate: (value: Thing, index: number, array: Thing[]) => boolean): Thing[];

    toRdfDatasetExt(): DatasetExt;
}

export default Document;