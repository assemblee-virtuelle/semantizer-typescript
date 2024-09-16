import { BlankNode, NamedNode } from "@rdfjs/types";
import { Resource } from "./Common";
import { DatasetSemantizer } from "./Datasets";
import Statement from "./Statement";
import Thing from "./Thing";

type Uri = string | Resource | NamedNode | BlankNode;

export interface StatementCollection {
    getStatementAll(thingUri: Uri, property: string, language?: string): DatasetSemantizer;
    hasStatement(statementUri: Uri, property?: string, language?: string): boolean;
    addStatement(statement: Statement): void;
    removeStatement(statement: Statement): void;

    containsStatement(statement: Statement): boolean;
    countStatement(): number;
    everyStatement(predicate: (value: Statement, index?: number, array?: Statement[]) => boolean, thisArg?: any): boolean;
    filterStatement(predicate: (value: Statement, index?: number, array?: Statement[]) => boolean): Statement[];
    findStatement(predicate: (value: Statement, index?: number, obj?: Statement[]) => boolean, thisArg?: any): Statement | undefined;
    forEachStatement(callbackfn: (value: Statement, index?: number, array?: Statement[]) => void, thisArg?: any): void;
    includesStatement(searchElement: Statement, fromIndex?: number): boolean;
    mapStatement(callbackfn: (value: Statement, index?: number, array?: Statement[]) => unknown, thisArg?: any): unknown[];
    reduceStatement(callbackfn: (previousValue: Statement, currentValue: Statement, currentIndex: number, array: Statement[]) => Statement): Statement; 
    sliceStatement(start?: number, end?: number): Statement;
    someStatement(predicate: (value: Statement, index?: number, array?: Statement[]) => unknown, thisArg?: any): boolean;
}

export interface ThingCollection extends StatementCollection {
    getThing(thingUri: Uri): Thing;
    hasThing(thingUri: Uri): boolean;
    addThing(thing: Thing): void;
    removeThing(thing: Thing): void;

    containsThing(thing: Thing): boolean;
    countThing(): number;
    everyThing(predicate: (value: Thing, index?: number, array?: Thing[]) => boolean, thisArg?: any): boolean;
    filterThing(predicate: (value: Thing, index?: number, array?: Thing[]) => boolean): Thing[];
    findThing(predicate: (value: Thing, index?: number, obj?: Thing[]) => boolean, thisArg?: any): Thing | undefined;
    forEachThing(callbackfn: (value: Thing, index?: number, array?: Thing[]) => void, thisArg?: any): void;
    includesThing(searchElement: Thing, fromIndex?: number): boolean;
    mapThing(callbackfn: (value: Thing, index?: number, array?: Thing[]) => unknown, thisArg?: any): unknown[];
    reduceThing(callbackfn: (previousValue: Thing, currentValue: Thing, currentIndex: number, array: Thing[]) => Thing): Thing; 
    sliceThing(start?: number, end?: number): Thing;
    someThing(predicate: (value: Thing, index?: number, array?: Thing[]) => unknown, thisArg?: any): boolean;
}

export interface DocumentCollection extends ThingCollection {
    getDocument(documentUri: Uri): Document;
    hasDocument(documentUri: Uri): boolean;
    addDocument(document: Document): void;
    removeDocument(document: Document): void;

    containsDocument(document: Document): boolean;
    countDocument(): number;
    everyDocument(predicate: (value: Document, index?: number, array?: Document[]) => boolean, thisArg?: any): boolean;
    filterDocument(predicate: (value: Document, index?: number, array?: Document[]) => boolean): Document[];
    findDocument(predicate: (value: Document, index?: number, obj?: Document[]) => boolean, thisArg?: any): Document | undefined;
    forEachDocument(callbackfn: (value: Document, index?: number, array?: Document[]) => void, thisArg?: any): void;
    includesDocument(searchElement: Document, fromIndex?: number): boolean;
    mapDocument(callbackfn: (value: Document, index?: number, array?: Document[]) => unknown, thisArg?: any): unknown[];
    reduceDocument(callbackfn: (previousValue: Document, currentValue: Document, currentIndex: number, array: Document[]) => Document): Document; 
    sliceDocument(start?: number, end?: number): Document;
    someDocument(predicate: (value: Document, index?: number, array?: Document[]) => unknown, thisArg?: any): boolean;
}