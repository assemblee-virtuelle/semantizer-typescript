import DatasetExt from "rdf-ext/lib/Dataset";
import Context from "./Context";
import Document from "./Document";
import Resource from "./Resource";
import Statement from "./Statement";

// TODO: add iterable
export interface Thing extends Resource, Iterable<Statement> {
    getDocument(): Document;
    isAnonymous(): boolean;
    getContext(): Context | undefined;
    expand(uri: string): string;
    shorten(uri: string): string;
    count(): number;
    isEmpty(): boolean;
    equals(other: Thing): boolean;
    toRdfDatasetExt(): DatasetExt;

    //filter(by: (property?: string, value?: string, datatype?: string) => boolean): Thing;
    forEach(callbackfn: (value: Statement, index: number, array: Statement[]) => void, thisArg?: any): void;
    map(callbackfn: (value: Statement, index: number, array: Statement[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: Statement, index: number, array: Statement[]) => boolean): Statement[];
    
    addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    

    getAllValuesAboutStatement(property: string): string[];
    

    setStatement(about: string, value: string, oldValue?: string, datatype?: string, language?: string): Thing;
    setRdfTypeStatement(value: string): Thing;
    setBooleanStatement(about: string, value: boolean): Thing;
    setStringStatement(about: string, value: string, locale?: string): Thing;
    setDecimalStatement(about: string, value: number): Thing;
    setIntegerStatement(about: string, value: number): Thing;
    setDateStatement(about: string, value: Date): Thing;
    setDatetimeStatement(about: string, value: Date): Thing;
    setTimeStatement(about: string, value: Date): Thing;

    removeStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    removeAllStatements(about: string): Thing;
    removeRdfTypeStatement(value: string): Thing;
    removeBooleanStatement(about: string, value: boolean): Thing;
    removeStringStatement(about: string, value: string, locale?: string): Thing;
    removeDecimalStatement(about: string, value: number): Thing;
    removeIntegerStatement(about: string, value: number): Thing;
    removeDateStatement(about: string, value: Date): Thing;
    removeDatetimeStatement(about: string, value: Date): Thing;
    removeTimeStatement(about: string, value: Date): Thing;
}

export default Thing;