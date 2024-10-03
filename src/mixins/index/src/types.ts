import { DatasetSemantizer, BlankNode, NamedNode, Literal, Semantizer } from "@semantizer/types";
import { Readable } from "stream";

export interface IndexOperations {
    loadEntryStream(): Promise<Readable>;
    forEachEntry(callbackfn: (value: IndexEntry, index?: number, array?: IndexEntry[]) => Promise<void>): Promise<void>;

    /**
     * 2024-10-02: We may need to remove the shape parameter to let it be managed by the strategy instead. The reason is that in the future
     * we should be able to express the shape with a SPARQL query. We would have a strategy that accepts a SPARQL query as input. In a 
     * first step, if the underlying engine (like Comunica) does not support named graph querying, the passed-in SPARQL query should 
     * not handle the source selection (find final indexes to query) but let the strategy find the final indexes (the strategy will 
     * have to parse the SPARQL to understand what shapes it has to find). When named graph querying would be possible with the SPARQL 
     * engine, the strategy could take a complete SPARQL query and let the engine does all the work (use link traversal to discover 
     * sources).
     */
    findTargetsRecursively(strategy: IndexStrategy, shape: IndexShape, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void>;
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
    execute(index: Index, shape: IndexShape, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void>;
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