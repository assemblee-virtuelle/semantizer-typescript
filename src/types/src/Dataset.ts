// interface StatementOwner ?

import dataFactory from '@rdfjs/data-model';
import datasetFactory from '@rdfjs/dataset';
import { BlankNode, DatasetCore as DatasetRdfjs, NamedNode, Quad, Quad_Graph, Quad_Object, Quad_Predicate, Quad_Subject, Term } from "@rdfjs/types";
import { Resource } from "./Common";

type Uri = string | Resource | NamedNode | BlankNode;

interface Statement extends Quad {
    getTermType(): string;
    getValue(): string;
    getSubject(): Term;
    getPredicate(): Term;
    getObject(): Term;
    getGraph(): Term;
    getDataset(): Dataset;
    getDocument(): Document;
    getThing(): Thing;
}

interface Thing extends StatementCollection {
    getDataset(): Dataset;
    getDocument(): Document;
}

interface Document extends ThingCollection, Resource {
    getDataset(): Dataset;
}

export interface StatementCollection {
    getStatementAll(thingUri: Uri, property: string, language?: string): Dataset;
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

export interface Dataset { // extends DocumentCollection {
    [Symbol.iterator](): Iterator<Quad>;

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
export type DatasetConstructor = new (...args: any[]) => DatasetRdfjs;
export type DocumentConstructor = new (...args: any[]) => DatasetRdfjs;

export function DocumentMixin<
    TBase extends DocumentConstructor
>(Base: TBase) {

    return class DocumentMixinImpl extends Base implements Document {
        getUri(): string {
            throw new Error('Method not implemented.');
        }
        hasUri(): boolean {
            throw new Error('Method not implemented.');
        }
        getThing(thingUri: Uri): Thing {
            throw new Error("Method not implemented.");
        }
        hasThing(thingUri: Uri): boolean {
            throw new Error("Method not implemented.");
        }
        addThing(thing: Thing): void {
            throw new Error("Method not implemented.");
        }
        removeThing(thing: Thing): void {
            throw new Error("Method not implemented.");
        }
        containsThing(thing: Thing): boolean {
            throw new Error("Method not implemented.");
        }
        countThing(): number {
            throw new Error("Method not implemented.");
        }
        everyThing(predicate: (value: Thing, index?: number | undefined, array?: Thing[] | undefined) => boolean, thisArg?: any): boolean {
            throw new Error("Method not implemented.");
        }
        filterThing(predicate: (value: Thing, index?: number | undefined, array?: Thing[] | undefined) => boolean): Thing[] {
            throw new Error("Method not implemented.");
        }
        findThing(predicate: (value: Thing, index?: number | undefined, obj?: Thing[] | undefined) => boolean, thisArg?: any): Thing | undefined {
            throw new Error("Method not implemented.");
        }
        forEachThing(callbackfn: (value: Thing, index?: number | undefined, array?: Thing[] | undefined) => void, thisArg?: any): void {
            throw new Error("Method not implemented.");
        }
        includesThing(searchElement: Thing, fromIndex?: number | undefined): boolean {
            throw new Error("Method not implemented.");
        }
        mapThing(callbackfn: (value: Thing, index?: number | undefined, array?: Thing[] | undefined) => unknown, thisArg?: any): unknown[] {
            throw new Error("Method not implemented.");
        }
        reduceThing(callbackfn: (previousValue: Thing, currentValue: Thing, currentIndex: number, array: Thing[]) => Thing): Thing {
            throw new Error("Method not implemented.");
        }
        sliceThing(start?: number | undefined, end?: number | undefined): Thing {
            throw new Error("Method not implemented.");
        }
        someThing(predicate: (value: Thing, index?: number | undefined, array?: Thing[] | undefined) => unknown, thisArg?: any): boolean {
            throw new Error("Method not implemented.");
        }
        getStatementAll(thingUri: Uri, property: string, language?: string | undefined): Dataset {
            throw new Error("Method not implemented.");
        }
        hasStatement(statementUri: Uri, property?: string | undefined, language?: string | undefined): boolean {
            throw new Error("Method not implemented.");
        }
        addStatement(statement: Statement): void {
            throw new Error("Method not implemented.");
        }
        removeStatement(statement: Statement): void {
            throw new Error("Method not implemented.");
        }
        containsStatement(statement: Statement): boolean {
            throw new Error("Method not implemented.");
        }
        countStatement(): number {
            throw new Error("Method not implemented.");
        }
        everyStatement(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => boolean, thisArg?: any): boolean {
            throw new Error("Method not implemented.");
        }
        filterStatement(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => boolean): Statement[] {
            throw new Error("Method not implemented.");
        }
        findStatement(predicate: (value: Statement, index?: number | undefined, obj?: Statement[] | undefined) => boolean, thisArg?: any): Statement | undefined {
            throw new Error("Method not implemented.");
        }
        forEachStatement(callbackfn: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => void, thisArg?: any): void {
            throw new Error("Method not implemented.");
        }
        includesStatement(searchElement: Statement, fromIndex?: number | undefined): boolean {
            throw new Error("Method not implemented.");
        }
        mapStatement(callbackfn: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => unknown, thisArg?: any): unknown[] {
            throw new Error("Method not implemented.");
        }
        reduceStatement(callbackfn: (previousValue: Statement, currentValue: Statement, currentIndex: number, array: Statement[]) => Statement): Statement {
            throw new Error("Method not implemented.");
        }
        sliceStatement(start?: number | undefined, end?: number | undefined): Statement {
            throw new Error("Method not implemented.");
        }
        someStatement(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => unknown, thisArg?: any): boolean {
            throw new Error("Method not implemented.");
        }
        getDataset(): Dataset {
            throw new Error("Method not implemented.");
        }

    }

}

export type ThingConstructor = new (...args: any[]) => DatasetRdfjs;

export function ThingMixin<
    TBase extends ThingConstructor
>(Base: TBase) {

    return class ThingMixinImpl extends Base implements Thing {
        getDataset(): Dataset {
            throw new Error("Method not implemented.");
        }
        getDocument(): Document {
            throw new Error("Method not implemented.");
        }
        getStatementAll(thingUri: Uri, property: string, language?: string | undefined): Dataset {
            throw new Error("Method not implemented.");
        }
        hasStatement(statementUri: Uri, property?: string | undefined, language?: string | undefined): boolean {
            throw new Error("Method not implemented.");
        }
        addStatement(statement: Statement): void {
            throw new Error("Method not implemented.");
        }
        removeStatement(statement: Statement): void {
            throw new Error("Method not implemented.");
        }
        containsStatement(statement: Statement): boolean {
            throw new Error("Method not implemented.");
        }
        countStatement(): number {
            throw new Error("Method not implemented.");
        }
        everyStatement(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => boolean, thisArg?: any): boolean {
            throw new Error("Method not implemented.");
        }
        filterStatement(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => boolean): Statement[] {
            throw new Error("Method not implemented.");
        }
        findStatement(predicate: (value: Statement, index?: number | undefined, obj?: Statement[] | undefined) => boolean, thisArg?: any): Statement | undefined {
            throw new Error("Method not implemented.");
        }
        forEachStatement(callbackfn: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => void, thisArg?: any): void {
            throw new Error("Method not implemented.");
        }
        includesStatement(searchElement: Statement, fromIndex?: number | undefined): boolean {
            throw new Error("Method not implemented.");
        }
        mapStatement(callbackfn: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => unknown, thisArg?: any): unknown[] {
            throw new Error("Method not implemented.");
        }
        reduceStatement(callbackfn: (previousValue: Statement, currentValue: Statement, currentIndex: number, array: Statement[]) => Statement): Statement {
            throw new Error("Method not implemented.");
        }
        sliceStatement(start?: number | undefined, end?: number | undefined): Statement {
            throw new Error("Method not implemented.");
        }
        someStatement(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => unknown, thisArg?: any): boolean {
            throw new Error("Method not implemented.");
        }

    }

}

// class StatementImpl implements Statement {
//     // private quad: Quad;
//     subject: Quad_Subject;
//     predicate: Quad_Predicate;
//     object: Quad_Object;
//     graph: Quad_Graph;
//     termType: "Quad";
//     value: "";

//     public constructor(quad: Quad) {
//         // this.quad = quad;
//         this.subject = quad.subject;
//         this.predicate = quad.predicate;
//         this.object = quad.object;
//         this.graph = quad.graph;
//         this.termType = quad.termType;
//         this.value = quad.value;
//     }

//     public getTermType(): string {
//         return this.termType;
//     }
//     getValue(): string {
//         throw new Error("Method not implemented.");
//     }
//     getSubject(): Term {
//         throw new Error("Method not implemented.");
//     }
//     getPredicate(): Term {
//         throw new Error("Method not implemented.");
//     }
//     getObject(): Term {
//         throw new Error("Method not implemented.");
//     }
//     getGraph(): Term {
//         throw new Error("Method not implemented.");
//     }
//     getDataset(): Dataset {
//         throw new Error("Method not implemented.");
//     }
//     getDocument(): Document {
//         throw new Error("Method not implemented.");
//     }
//     getThing(): Thing {
//         throw new Error("Method not implemented.");
//     }
//     equals(other: Term | null | undefined): boolean {
//         throw new Error("Method not implemented.");
//     }
    
// }

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
