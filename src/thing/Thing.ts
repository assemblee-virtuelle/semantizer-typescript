import DatasetExt from "rdf-ext/lib/Dataset";
import Context from "../common/Context";
import Document from "../document/Document";
import Resource from "../common/Resource";
import Statement from "../statement/Statement";

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

    forEach(callbackfn: (value: Statement, index: number, array: Statement[]) => void, thisArg?: any): void;
    map(callbackfn: (value: Statement, index: number, array: Statement[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: Statement, index: number, array: Statement[]) => boolean): Statement[];
    
    add(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    // addStatement(statement: Statement): Thing;
    get(property: string): string;
    set(about: string, value: string, oldValue?: string, datatype?: string, language?: string): Thing;
    remove(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    
}

export default Thing;