import { BlankNode, NamedNode, Literal } from "@rdfjs/types";
import { DatasetSemantizer } from "@semantizer/types";

export interface IndexOperations {
    forEachEntry(callbackfn: (value: IndexEntry, index?: number, array?: IndexEntry[]) => Promise<void>): Promise<void>;
    findTargetsRecursively(shape: IndexShape, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void>;
}

export interface IndexEntryNonDestructiveOperations {
    compareShape(shape: IndexShape): number;
    hasSubIndex(): boolean;
    getShape(): IndexShape | undefined;
    getTarget(): DatasetSemantizer | undefined;
    getSubIndex(): Index | undefined;
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
    getPath(): NamedNode | undefined;
    getValue(): NamedNode | Literal | BlankNode | undefined;
    // getPattern(): string | undefined;
}

export type IndexShapeProperty = DatasetSemantizer & IndexShapePropertyOperations;
export type IndexShape = DatasetSemantizer & IndexShapeOperations;
export type IndexEntry = DatasetSemantizer & IndexEntryNonDestructiveOperations;
export type Index = DatasetSemantizer & IndexOperations;