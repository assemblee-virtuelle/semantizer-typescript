// interface StatementOwner ?

import { DatasetCore as DatasetCoreRdfjs, Dataset as DatasetRdfjs, NamedNode, Quad, Literal, BlankNode, Term } from "@rdfjs/types";
import { Loader, Resource, WithSemantizer } from './Common';
import { Semantizer } from "./Semantizer";

export interface WithOrigin {
    getOrigin(): NamedNode | BlankNode | undefined;
    setOrigin(uri: NamedNode | BlankNode): void;
    getOriginDocument(): NamedNode | undefined;
    getOriginThing(): NamedNode | BlankNode | undefined;
    setOriginThing(term: NamedNode | BlankNode): void;
}

// = RDFJS dataset
export interface Dataset extends DatasetRdfjs {
    count(): number;
    isEmpty(): boolean;

    hasNamedGraph(): boolean;
    countNamedGraph(): number;

    getNamedGraph(namedGraph: NamedNode): NamedGraphWithOrigin | undefined;
    getDefaultGraph(): GraphWithOrigin;

    isDefaultGraphEmpty(): boolean;
    isNamedGraphEmpty(namedGraph: NamedNode): boolean;

    getNode(subject: NamedNode | BlankNode, graph?: NamedNode): GraphWithOrigin | undefined;
    getNodeAll(graph?: NamedNode): GraphWithOrigin[];

    getLiteral(thing: Resource, predicate: Resource, language?: string, graph?: NamedNode): Literal | undefined;
    getLiteralAll(thing: Resource, predicate: Resource, language?: string, graph?: NamedNode): Literal[];

    getLinkedObject(predicate: Resource, thingOrDataset?: Resource | DatasetSemantizer, graph?: NamedNode): DatasetSemantizer | undefined;
    // getObject(predicate: Resource, thing?: Resource, graph?: NamedNode): DatasetWithOrigin | undefined;
    getLinkedObjectAll(predicate: Resource, thingOrDataset?: Resource | DatasetSemantizer, graph?: NamedNode): DatasetSemantizer[];

    forEachThing(callbackfn: (value: GraphWithOrigin, index?: number, array?: GraphWithOrigin[]) => void, graph?: NamedNode): void;

    load(resource?: string | DatasetSemantizer | NamedNode, options?: DatasetLoadOptions): Promise<void>;
}

export interface Graph extends DatasetRdfjs {
    count(): number;
    isEmpty(): boolean;

    getNode(subject: NamedNode | BlankNode): GraphWithOrigin | undefined;
    getNodeAll(): GraphWithOrigin[];

    getLiteral(thing: Resource, predicate: Resource, language?: string): Literal | undefined;
    getLiteralAll(thing: Resource, predicate: Resource, language?: string): Literal[];

    getObject(predicate: Resource, thing?: Resource): DatasetSemantizer | undefined;
    getObjectAll(predicate: Resource, thing?: Resource): DatasetSemantizer[];

    forEachThing(callbackfn: (value: GraphWithOrigin, index?: number, array?: GraphWithOrigin[]) => void): void;

    load(resource?: string | DatasetSemantizer | NamedNode, options?: DatasetLoadOptions): Promise<void>;
}

export interface NamedGraph extends Graph {
    getGraphName(): NamedNode | BlankNode;
    getGraph(): GraphWithOrigin;
}

// = RDF data model Dataset
/**
 * The iterate method should iterate through default graph by default.
 */
export type DatasetSemantizer = Dataset & WithSemantizer & WithOrigin;

export type GraphWithOrigin = Graph & WithOrigin;

export type NamedGraphWithOrigin = NamedGraph & WithOrigin;

export type DatasetSemantizerMixinConstructor = new (...args: any[]) => DatasetSemantizer;

export interface DatasetLoadOptions {
    loader?: Loader
}

export interface DatasetBaseFactory {
    load(semantizer: Semantizer, resource: string): Promise<DatasetSemantizer>;
    build(semantizer: Semantizer, sourceDataset?: DatasetSemantizer): DatasetSemantizer;
}

// From RDF data model
// export interface GraphDataset<T extends DatasetWithOrigin> extends DatasetCore {
//     addObject(predicate: Resource, value: NamedNode | Literal | BlankNode, thing?: Resource): void;

//     getDefaultGraph(): QuadDataset;
//     getGraph(graph: NamedNode): QuadDataset | undefined;
//     getGraphAll(): QuadDataset[];

//     getThing(thing: Resource, graph?: NamedNode): T | undefined;
//     getThingAll(): T[];

//     getLiteral(thing: Resource, predicate: Resource, language?: string): Literal | undefined;
//     getLiteralAll(thing: Resource, predicate: Resource, language?: string): Literal[];

//     getObject(predicate: Resource, thing?: Resource): T | undefined;
//     getObjectAll(predicate: Resource, thing?: Resource): T[];

//     isEmpty(): boolean;
//     isTypeOf(type: string | NamedNode, thing?: Resource): boolean;

//     load(resource?: string | RdfModelDataset<any> | NamedNode, options?: DatasetLoadOptions): Promise<void>;
    
//     forEachThing(callbackfn: (value: T, index?: number, array?: T[]) => void, thingType?: string | NamedNode): void;
// }

// export type DatasetWithOrigin = RdfModelDataset<DatasetWithOrigin> & WithOrigin;
// export type DatasetWithSemantizer = DatasetWithOrigin & WithSemantizer;

// export type QuadConstructor = new (...args: any[]) => Quad;
// export type DatasetConstructor = new (...args: any[]) => DatasetWithSemantizer;

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
