import { BlankNode, DatasetCore, NamedNode, Quad } from "@rdfjs/types";
import { Semantizer } from "./Semantizer";

export type Resource = NamedNode | BlankNode;

export interface WithSemantizer {
    getSemantizer(): Semantizer;
    // toRdfjsDataset(): DatasetRdfjs;
}

export interface WithOrigin {
    getOrigin(): NamedNode | BlankNode | undefined;
    setOrigin(uri: NamedNode | BlankNode): void;
    getOriginDocument(): NamedNode | undefined;
    getOriginThing(): NamedNode | BlankNode | undefined;
    setOriginThing(term: NamedNode | BlankNode): void;
}

export type QuadIterableSemantizer = Iterable<Quad> & WithSemantizer & WithOrigin;

export interface Countable {
    count(): number;
    isEmpty(): boolean;
}

export interface Copyable {
    toCopy(): ThisType<this>;
}

export interface Comparable {
    equals(other: ThisType<this>): boolean;
    difference(other: ThisType<this>): ThisType<this>;
}


export interface DocumentLoadOptions {
    loadSeeAlso?: boolean;
    seeAlsoMaxDepth?: number;
}

export type AnyFunction<A = any> = (...input: any[]) => A;
export type AnyConstructor<A = object> = new (...input: any[]) => A;
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;