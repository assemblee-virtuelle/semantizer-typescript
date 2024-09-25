// interface StatementOwner ?

import { BlankNode, Dataset as DatasetRdfjs, Literal, NamedNode, Quad, Stream } from "@rdfjs/types";
import { QuadIterableSemantizer, Resource, WithOrigin, WithSemantizer } from './Common';
import { Semantizer } from "./Semantizer";
import { Loader, LoaderQuadStream } from "./Loader";



// = RDFJS dataset
export interface Dataset extends DatasetRdfjs {
    count(): number;
    isEmpty(): boolean;

    hasNamedGraph(): boolean;
    countNamedGraph(): number;

    getDefaultGraph(): DatasetSemantizer;
    getNamedGraph(namedGraph: NamedNode): DatasetSemantizer | undefined;
    getNamedGraphAll(namedGraph: NamedNode): DatasetSemantizer[];

    getRdfTypeAll(namedGraph?: NamedNode): NamedNode[];
    isRdfTypeOf(rdfType: NamedNode, ...otherTypes: NamedNode[]): boolean;

    isDefaultGraphEmpty(): boolean;
    isNamedGraphEmpty(namedGraph: NamedNode): boolean;

    getSubGraph(subject: NamedNode | BlankNode, namedGraph?: NamedNode): DatasetSemantizer | undefined;
    getSubGraphAll(namedGraph?: NamedNode): DatasetSemantizer[];

    getLiteral(thing: Resource, predicate: Resource, language?: string, graph?: NamedNode): Literal | undefined;
    getLiteralAll(thing: Resource, predicate: Resource, language?: string, graph?: NamedNode): Literal[];

    getLinkedObject(predicate: Resource, thingOrDataset?: Resource | DatasetSemantizer, graph?: NamedNode): DatasetSemantizer | undefined;
    // getObject(predicate: Resource, thing?: Resource, graph?: NamedNode): DatasetWithOrigin | undefined;
    getLinkedObjectAll(predicate: Resource, thingOrDataset?: Resource | DatasetSemantizer, graph?: NamedNode): DatasetSemantizer[];

    /**
     * 
     * @param callbackfn 
     * @param namedGraph Default is DefaultGraph
     */
    forEachSubGraph(callbackfn: (value: DatasetSemantizer, index?: number, array?: DatasetSemantizer[]) => Promise<void>, namedGraph?: NamedNode): Promise<void>;

    load(resource?: string | DatasetSemantizer | NamedNode, options?: DatasetLoadOptions): Promise<void>;
    loadQuadStream(resource?: string | DatasetSemantizer | NamedNode, options?: DatasetQuadStreamOptions): Promise<Stream<Quad>>;
}

export interface Graph extends DatasetRdfjs {
    count(): number;
    isEmpty(): boolean;

    getSubGraph(subject: NamedNode | BlankNode): GraphSemantizer | undefined;
    getSubGraphAll(): GraphSemantizer[];

    getLiteral(thing: Resource, predicate: Resource, language?: string): Literal | undefined;
    getLiteralAll(thing: Resource, predicate: Resource, language?: string): Literal[];

    getLinkedObject(predicate: Resource, thing?: Resource): DatasetSemantizer | undefined;
    getLinkedObjectAll(predicate: Resource, thing?: Resource): DatasetSemantizer[];

    forEachThing(callbackfn: (value: GraphSemantizer, index?: number, array?: GraphSemantizer[]) => void): void;

    load(resource?: string | DatasetSemantizer | NamedNode, options?: DatasetLoadOptions): Promise<void>;
}

export interface NamedGraph extends Graph {
    getGraphName(): NamedNode | BlankNode;
    getGraph(): GraphSemantizer;
}

// = RDF data model Dataset
/**
 * The iterate method should iterate through default graph by default.
 */
export type DatasetSemantizer = Dataset & WithSemantizer & WithOrigin;

export type GraphSemantizer = Graph & WithSemantizer & WithOrigin;

export type NamedGraphSemantizer = NamedGraph & WithSemantizer & WithOrigin;

export type DatasetSemantizerMixinConstructor = new (...args: any[]) => DatasetSemantizer;
export type DatasetSemantizerRdfjsMixinConstructor = new(...args: any[]) => DatasetRdfjs & WithSemantizer & WithOrigin;

export interface DatasetLoadOptions {
    loader?: Loader
}

export interface DatasetQuadStreamOptions {
    quadStreamLoader?: LoaderQuadStream;
}

export interface DatasetBaseFactory {
    load(semantizer: Semantizer, resource: string): Promise<DatasetSemantizer>;
    build(semantizer: Semantizer, sourceDataset?: QuadIterableSemantizer): DatasetSemantizer;
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
