import { NamedNode } from "@rdfjs/types";
import { DatasetWithOrigin, Resource } from "@semantizer/types";

export interface WebIdProfileNonDestructiveOperations {
    getMaker(): DatasetWithOrigin | undefined;
    getPrimaryTopic(thing?: Resource, graph?: string | NamedNode): DatasetWithOrigin | undefined;
}

export type WebIdProfile = DatasetWithOrigin & WebIdProfileNonDestructiveOperations;

export type WebIdProfileConstructor = new (...args: any[]) => WebIdProfile;