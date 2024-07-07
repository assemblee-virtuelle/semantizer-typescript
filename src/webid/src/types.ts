import { Document, Thing } from "@semantizer/types";

export interface WebIdProfileNonDestructiveOperations {
    getMaker(): Thing;
    getPrimaryTopic(): Thing;
}

export type WebIdProfile = Document<Thing, Thing> & WebIdProfileNonDestructiveOperations;

export type WebIdProfileConstructor = new (...args: any[]) => WebIdProfile;