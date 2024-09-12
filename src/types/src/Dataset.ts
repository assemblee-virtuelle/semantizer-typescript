// interface StatementOwner ?

import dataFactory from '@rdfjs/data-model';
import datasetFactory from '@rdfjs/dataset';
import { DatasetCore as DatasetRdfjs, NamedNode, Quad, Literal, BlankNode } from "@rdfjs/types";
import { Loader } from './Common';
import { Semantizer } from './Semantizer';

export interface DatasetSemantizer extends DatasetRdfjs {
    [Symbol.iterator](): Iterator<Quad>;
    getSemantizer(): Semantizer;
}

export interface DatasetLoadOptions {
    loader?: Loader
}

export interface Dataset extends DatasetSemantizer {
    addObject(predicate: NamedNode, value: NamedNode | Literal | BlankNode, thing?: NamedNode): void;
    getThing(uri: string): Dataset;
    getStatements(thingUri: string, predicate: string): Dataset;
    getObject(predicate: string, thingUri?: string): Dataset;
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

const datasetCore = datasetFactory.dataset();

const blankNode = dataFactory.blankNode();

datasetCore.add(dataFactory.quad(
    dataFactory.namedNode('http://example.org/webId'),
    dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    dataFactory.namedNode('http://xmlns.com/foaf/0.1/PersonalProfileDocument'),
    dataFactory.namedNode('http://example.org/webId')
));

datasetCore.add(dataFactory.quad(
    dataFactory.namedNode('http://example.org/webId'),
    dataFactory.namedNode('http://xmlns.com/foaf/0.1/primaryTopic'),
    dataFactory.namedNode('http://example.org/otherWebIdDocument#it'),
    dataFactory.namedNode('http://example.org/webId')
));

// datasetCore.add(dataFactory.quad(
//     dataFactory.namedNode('http://example.org/webId'),
//     dataFactory.namedNode('http://xmlns.com/foaf/0.1/primaryTopic'),
//     dataFactory.namedNode('http://example.org/webId#it'),
//     dataFactory.namedNode('http://example.org/webId')
// ));

// datasetCore.add(dataFactory.quad(
//     dataFactory.namedNode('http://example.org/webId#it'),
//     dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
//     dataFactory.namedNode('http://xmlns.com/foaf/0.1/Organization'),
//     dataFactory.namedNode('http://example.org/webId')
// ));

// datasetCore.add(dataFactory.quad(
//     dataFactory.namedNode('http://example.org/webId#it'),
//     dataFactory.namedNode('https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#maintains'),
//     dataFactory.namedNode('http://example.org/catalog1/index'),
//     dataFactory.namedNode('http://example.org/webId')
// ));

// datasetCore.add(dataFactory.quad(
//     dataFactory.namedNode('http://example.org/webId#it'),
//     dataFactory.namedNode('http://www.w3.org/2000/01/rdf-schema#seeAlso'),
//     dataFactory.namedNode('http://example.org/protected'),
//     dataFactory.namedNode('http://example.org/webId')
// ));

// datasetCore.add(dataFactory.quad(
//     dataFactory.namedNode('http://example.org/webId#it'),
//     dataFactory.namedNode('https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#maintains'),
//     dataFactory.namedNode('http://example.org/catalog2/index'),
//     dataFactory.namedNode('http://example.org/protected')
// ));

datasetCore.add(dataFactory.quad(
    dataFactory.namedNode('http://example.org/webId'),
    dataFactory.namedNode('http://xmlns.com/foaf/0.1/primaryTopic'),
    blankNode,
    dataFactory.namedNode('http://example.org/webId')
));

datasetCore.add(dataFactory.quad(
    blankNode,
    dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    dataFactory.namedNode('http://xmlns.com/foaf/0.1/Organization'),
    dataFactory.namedNode('http://example.org/webId')
));

datasetCore.add(dataFactory.quad(
    blankNode,
    dataFactory.namedNode('https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#maintains'),
    dataFactory.namedNode('http://example.org/catalog1/index'),
    dataFactory.namedNode('http://example.org/webId')
));

datasetCore.add(dataFactory.quad(
    blankNode,
    dataFactory.namedNode('http://www.w3.org/2000/01/rdf-schema#seeAlso'),
    dataFactory.namedNode('http://example.org/protected'),
    dataFactory.namedNode('http://example.org/webId')
));

datasetCore.add(dataFactory.quad(
    blankNode, 
    dataFactory.namedNode('https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#maintains'),
    dataFactory.namedNode('http://example.org/catalog2/index'),
    dataFactory.namedNode('http://example.org/protected')
));

// for (const q of datasetCore) {
//     console.log(q.graph.value, q.subject.value, q.predicate.value, q.object.value);
// }

// const DatasetMixinImpl = DatasetMixin(DatasetImpl);
// const dataset2 = new DatasetMixinImpl(datasetCore);

// const maintainedCatalogs = dataset2.getStatementAll('http://example.org/webId#it', 'https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#maintains');
// for (const q of maintainedCatalogs) {
//     console.log(q.object.value, q.graph.value)
// }

const primaryTopic = datasetCore.match(
    dataFactory.namedNode('http://example.org/webId'), // undefined, TODO: put the document URI to avoid bugs
    dataFactory.namedNode('http://xmlns.com/foaf/0.1/primaryTopic')
);

console.log(primaryTopic);

for (const q of primaryTopic) {
    const primaryTopicObject = q.object;
    
    if (primaryTopicObject.termType === "BlankNode") {
        console.log("Data loaded from blank node:")
        const matched = datasetCore.match(primaryTopicObject);
        console.log(matched)
    }

    if (primaryTopicObject.termType === 'NamedNode') {
        const matched = datasetCore.match(primaryTopicObject);
        if (matched.size === 0) {
            console.log("The primaryTopic is contained in another document: ", primaryTopicObject.value);
        } else {
            console.log("Data loaded from named node:")
            console.log(matched)
        }
    }
}
