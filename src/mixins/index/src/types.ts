import { DatasetSemantizer, BlankNode, NamedNode, Literal, Semantizer } from "@semantizer/types";
import { Readable } from "stream";

export interface IndexOperations {
    loadEntryStream(): Promise<Readable>;
    forEachEntry(callbackfn: (value: IndexEntry, index?: number, array?: IndexEntry[]) => Promise<void>): Promise<void>;
    findTargetsRecursively(strategy: IndexStrategy, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void>;
}

export interface IndexEntryOperations {
    compareShape(shape: IndexShape): IndexShapeComparisonResult;
    hasSubIndex(): boolean;
    getShape(): IndexShape | undefined;
    getTarget(): DatasetSemantizer | undefined;
    getTargetUri(): string | undefined;
    getSubIndex(): Index | undefined;
}

export interface IndexShapeOperations {
    // isClosed(): boolean;
    hasMultiCriteria(): boolean;
    compares(other: IndexShape): IndexShapeComparisonResult;
    getRdfTypeProperty(): IndexShapeProperty;
    getFilterProperties(): IndexShapeProperty[];
    countProperties(): number;
    forEachProperty(callbackfn: (value: IndexShapeProperty, index?: number, array?: IndexShapeProperty[]) => void): void;
    getPropertiesAll(): IndexShapeProperty[];
    addTargetRdfType(rdfType: NamedNode): void;
    addValueProperty(path: NamedNode, value: NamedNode | Literal | BlankNode): void;
    addPatternProperty(path: NamedNode, value: NamedNode | Literal | BlankNode): void;
}

export interface IndexShapePropertyBaseOperations {
    getPredicate(): NamedNode;
    isPatternProperty(): boolean;
    isValueProperty(): boolean;
}

export interface IndexShapePropertyOperations {
    hasSamePath(other: IndexShapeProperty): boolean;
    hasSameValue(other: IndexShapeProperty): boolean;
    equals(other: IndexShapeProperty): boolean;
    compares(other: IndexShapeProperty): number;
    getPath(): NamedNode | undefined;
    getValue(): NamedNode | Literal | BlankNode | undefined;
}

export interface IndexShapeComparisonResult {
    getResult(): number;
    getComparedPath(): NamedNode;
}

export interface IndexStrategy {
    getSemantizer(): Semantizer;
    setSemantizer(semantizer: Semantizer): void;
    execute(index: Index, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void>;
}

export interface IndexStrategyFinalIndexes {
    execute(rootIndex: Index, shape: IndexShape, maxFind?: number): Readable;
}

export interface FinalIndexResult {
    getIndex(): Index;
    getPath(): NamedNode;
}

export type IndexShapePropertyBase = DatasetSemantizer & IndexShapePropertyBaseOperations;
export type IndexShapeProperty = IndexShapePropertyBase & IndexShapePropertyOperations;
export type IndexShape = DatasetSemantizer & IndexShapeOperations;
export type IndexEntry = DatasetSemantizer & IndexEntryOperations;
export type Index = DatasetSemantizer & IndexOperations;