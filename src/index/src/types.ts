import { BlankNode, NamedNode, Literal } from "@rdfjs/types";
import { Dataset } from "@semantizer/types";

export interface IndexOperations {
    forEachEntry(callbackfn: (value: IndexEntry, index?: number, array?: IndexEntry[]) => void): void;
    findTargetsRecursively(shape: IndexShape, callbackfn: (target: Dataset) => void, limit?: number): Promise<void>;
}

export interface IndexEntryNonDestructiveOperations {
    compareShape(shape: IndexShape): number;
    hasSubIndex(): boolean;
    getShape(): IndexShape;
    getTarget(): Dataset;
    getSubIndex(): Index;
}

export interface IndexShapeOperations {
    // isClosed(): boolean;
    compares(other: IndexShape): number;
    getRdfTypeProperty(): IndexShapeProperty;
    getFilterProperty(): IndexShapeProperty;
    countProperties(): number;
    forEachProperty(callbackfn: (value: IndexShapeProperty, index?: number, array?: IndexShapeProperty[]) => void): void;
    getPropertiesAll(): IndexShapeProperty[];
    addProperty(path: NamedNode, value: NamedNode | Literal | BlankNode): void;
}

export interface IndexShapePropertyOperations {
    hasSamePath(other: IndexShapeProperty): boolean;
    hasSameValue(other: IndexShapeProperty): boolean;
    equals(other: IndexShapeProperty): boolean;
    compares(other: IndexShapeProperty): number;
    getPath(): NamedNode;
    getValue(): NamedNode | Literal | BlankNode;
    // getPattern(): string | undefined;
}

export type IndexShapeProperty = Dataset & IndexShapePropertyOperations;
export type IndexShape = Dataset & IndexShapeOperations;
export type IndexEntry = Dataset & IndexEntryNonDestructiveOperations;
export type Index = Dataset & IndexOperations;