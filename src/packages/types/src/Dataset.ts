// interface StatementOwner ?

import { Dataset as DatasetRdfjs, NamedNode, Quad, Literal, BlankNode } from "@rdfjs/types";
import { Loader } from './Common';
import { Semantizer } from './Semantizer';

export interface DatasetSemantizer extends DatasetRdfjs {
    getSemantizer(): Semantizer;
    // toRdfjsDataset(): DatasetRdfjs;
}

export interface DatasetLoadOptions {
    loader?: Loader
}

export interface Dataset extends DatasetSemantizer {
    addObject(predicate: NamedNode, value: NamedNode | Literal | BlankNode, thing?: NamedNode): void;
    getThing(uri: string): Dataset;
    getStatements(thingUri: string, predicate: string): Dataset;
    getObject(predicate: NamedNode, thing?: NamedNode | BlankNode): Dataset | undefined;
    getObjectAll(predicate: string, thingUri?: string): Dataset[];
    // getStatement(thingUri, predicateUri: string): Statement;
    getLiteral(thingUri: string, predicateUri: string, language?: string): string;
    isEmpty(): boolean;
    load(resource?: string | Dataset | NamedNode, options?: DatasetLoadOptions): Promise<void>;
    getUri(): string | undefined;
    setUri(uri: string): void;

    isTypeOf(type: string | NamedNode, thing?: string | NamedNode): boolean;
    forEachThing(callbackfn: (value: Dataset, index?: number, array?: Dataset[]) => void, thingType?: string | NamedNode): void

    //loadThing(): Promise<Thing>;

    // getStatementInDocument(documentUri: Uri, statementUri: Uri, property: string, language?: string): Statement;
    // getThingInDocument(documentUri: Uri, thingUri: Uri): Thing;
    // addThingInDocument(documentUri: Uri, thing: Thing): void;
    // removeThingInDocument(documentUri: Uri, thing: Thing): void;
    // addStatementInDocument(documentUri: Uri, statement: Statement): void;
    // removeStatementInDocument(documentUri: Uri, statement: Statement): void;

    // addQuadInDocument(documentUri: Uri, quad: Quad): void;
    // removeQuadInDocument(documentUri: Uri, quad: Quad): void;

    // containsStatementInDocument(documentUri: Uri, element: Statement): boolean;
    // countStatementInDocument(documentUri: Uri): number;
    // everyStatementInDocument(documentUri: Uri, predicate: (value: Statement, index?: number, array?: Statement[]) => boolean, thisArg?: any): boolean;
    // filterStatementInDocument(documentUri: Uri, predicate: (value: Statement, index?: number, array?: Statement[]) => boolean): Statement[];
    // findStatementInDocument(documentUri: Uri, predicate: (value: Statement, index?: number, obj?: Statement[]) => boolean, thisArg?: any): Statement | undefined;
    // forEachStatementInDocument(documentUri: Uri, callbackfn: (value: Statement, index?: number, array?: Statement[]) => void, thisArg?: any): void;
    // includesStatementInDocument(documentUri: Uri, searchElement: Statement, fromIndex?: number): boolean;
    // mapStatementInDocument(documentUri: Uri, callbackfn: (value: Statement, index?: number, array?: Statement[]) => unknown, thisArg?: any): unknown[];
    // reduceStatementInDocument(documentUri: Uri, callbackfn: (previousValue: Statement, currentValue: Statement, currentIndex: number, array: Statement[]) => Statement): Statement; 
    // sliceStatementInDocument(documentUri: Uri, start?: number, end?: number): Statement;
    // someStatementInDocument(documentUri: Uri, predicate: (value: Statement, index?: number, array?: Statement[]) => unknown, thisArg?: any): boolean;

    // containsThingInDocument(documentUri: Uri, thing: Thing): boolean;
    // countThingInDocument(documentUri: Uri): number;
    // everyThingInDocument(documentUri: Uri, predicate: (value: Thing, index?: number, array?: Thing[]) => boolean, thisArg?: any): boolean;
    // filterThingInDocument(documentUri: Uri, predicate: (value: Thing, index?: number, array?: Thing[]) => boolean): Thing[];
    // findThingInDocument(documentUri: Uri, predicate: (value: Thing, index?: number, obj?: Thing[]) => boolean, thisArg?: any): Thing | undefined;
    // forEachThingInDocument(documentUri: Uri, callbackfn: (value: Thing, index?: number, array?: Thing[]) => void, thisArg?: any): void;
    // includesThingInDocument(documentUri: Uri, searchElement: Thing, fromIndex?: number): boolean;
    // mapThingInDocument(documentUri: Uri, callbackfn: (value: Thing, index?: number, array?: Thing[]) => unknown, thisArg?: any): unknown[];
    // reduceThingInDocument(documentUri: Uri, callbackfn: (previousValue: Thing, currentValue: Thing, currentIndex: number, array: Thing[]) => Thing): Thing; 
    // sliceThingInDocument(documentUri: Uri, start?: number, end?: number): Thing;
    // someThingInDocument(documentUri: Uri, predicate: (value: Thing, index?: number, array?: Thing[]) => unknown, thisArg?: any): boolean;
}

export type QuadConstructor = new (...args: any[]) => Quad;
export type DatasetConstructor = new (...args: any[]) => DatasetSemantizer;
