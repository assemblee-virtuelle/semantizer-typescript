import { DatasetSemantizer, Resource,  NamedNode } from "@semantizer/types";

export interface WebIdProfileNonDestructiveOperations {
    getMaker(): DatasetSemantizer | undefined;
    getPrimaryTopic(thing?: Resource, graph?: NamedNode): DatasetSemantizer | undefined;
}

export type WebIdProfile = DatasetSemantizer & WebIdProfileNonDestructiveOperations;

export type WebIdProfileConstructor = new (...args: any[]) => WebIdProfile;