import { Dataset, Thing } from "@semantizer/types";
import { DatasetCore as DatasetRdfjs, Quad } from "@rdfjs/types";

export interface WebIdProfileNonDestructiveOperations {
    getMaker(): Thing;
    getPrimaryTopic(): Dataset;
}

export type WebIdProfile = Dataset & WebIdProfileNonDestructiveOperations;

export type WebIdProfileConstructor = new (...args: any[]) => WebIdProfile;