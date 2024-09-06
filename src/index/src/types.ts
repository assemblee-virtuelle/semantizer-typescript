import { Dataset, Loader } from "@semantizer/types";

export interface Property {
    path: string;
    value: string;
}

export interface IndexNonDestructiveOperations {
    // getEntries(path?: string, value?: string, pattern?: string): IndexEntry[];
    getTargets(loader: Loader, property: Property, ...properties: Property[]): Promise<Dataset[]>;
}

export interface IndexEntryNonDestructiveOperations {
    // getShape(): IndexEntryShape | undefined;
    // hasShape(): boolean;
    // hasProperties(): boolean;
    // hasProperty(path?: string, value?: string, pattern?: string): boolean;
    // getSubIndex(): Index | undefined;
    // getSubIndexUri(): string | undefined;
    // getPropertiesAll(entry: string | Resource): IndexEntryShapeProperty[];
}

export interface IndexEntryShapeNonDestructiveOperations {
    // isClosed(): boolean;
    // getPropertiesAll(): IndexEntryShapeProperty[];
}

export interface IndexEntryShapePropertyNonDestructiveOperations {
    // getPath(): string | undefined;
    // getValue(): string | undefined;
    // getPattern(): string | undefined;
}

// export type IndexEntry = Thing & IndexEntryNonDestructiveOperations;
// export type IndexEntryShape = Thing & IndexEntryShapeNonDestructiveOperations;
// export type IndexEntryShapeProperty = Thing & IndexEntryShapePropertyNonDestructiveOperations;
export type Index = Dataset & IndexNonDestructiveOperations;