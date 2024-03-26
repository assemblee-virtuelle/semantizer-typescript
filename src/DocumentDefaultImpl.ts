import BlankNodeExt from "rdf-ext/lib/BlankNode";
import Semantizer, { ResourceCreationParameters } from "./Semantizer";
import { Document } from "./Document";
import rdf from 'rdf-ext';
import QuadExt from 'rdf-ext/lib/Quad';
import DatasetExt from "rdf-ext/lib/Dataset";
import Thing from "./Thing";
import Resource from "./Resource";
import Context from "./Context";
import ThingDefaultImpl from "./ThingDefaultImpl.js";
//import * as RDF from "@rdfjs/types";

// states: Object | Document | Container
// states: Local | Distant
// states: Created | Modified | Loaded

export class DocumentDefaultImpl implements Document {

    private _uri: string;
    private _things: Thing[];
    private _context?: Context;

    public constructor(uri?: string, context?: Context) {
        this._uri = uri ?? '';
        this._context = context;
        this._things = [];        
    }

    public setContext(context: Context): void {
        this._context = context;
    }

    public getContext(): Context | undefined {
        return this._context;
    }

    public expand(uri: string): string {
        return this.getContext()?.expand(uri) ?? uri;
    }

    public shorten(uri: string): string {
        return this.getContext()?.shorten(uri) ?? uri;
    }

    public addThing(thing: Thing): Document {
        this._things.push(thing);
        return this;
    }

    public addDocument(document: Document): Document {
        throw new Error("Method not implemented.");
    }

    public getThing(uri: string): Thing | null {
        throw new Error("Method not implemented.");
    }

    protected isUrl(input: string): boolean {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }

    protected generateUriWithFragment(): string {
        return this.createUriWithFragment(this.generateThingName());
    }

    protected getOrCreateNameWithHash(nameWithOrWithoutHash: string): string {
        return nameWithOrWithoutHash.startsWith('#')? nameWithOrWithoutHash: `#${nameWithOrWithoutHash}`;
    }

    protected createUriWithFragment(name: string): string {
        return this.getUri() + this.getOrCreateNameWithHash(name);
    }

    protected checkUriCanBeAddedToTheDocument(uri: string): boolean {
        return this.isUrl(uri) && !this.hasStatementsAbout(uri);
    }

    protected getSafeUriFromUri(uri: string): string {
        if (!this.checkUriCanBeAddedToTheDocument(uri))
            throw new Error(`You are trying to add the thing "${uri}" which is already part of the document.`);
        return uri;
    }

    protected getSafeUriFromName(name: string): string {
        const uri = this.createUriWithFragment(name);
        if (!this.checkUriCanBeAddedToTheDocument(uri))
            throw new Error(`You are trying to add the thing "${uri}" which is already part of the document.`);
        return uri;
    }

    protected getSafeUriFromNameHintOrUri(nameHintOrUri: string): string {
        return this.isUrl(nameHintOrUri)? this.getSafeUriFromUri(nameHintOrUri): this.getSafeUriFromName(nameHintOrUri);
    }

    public createThingToSelfDescribe(): Thing {
        const thing = ThingDefaultImpl.createThingToDescribeDocument(this);
        this.addThing(thing);
        return thing;
    }

    public generateThingName(): string {
        return "generatedName"; // TODO
    }

    protected validateOrCreateThingUri(nameHintOrUri?: string): string {
        return nameHintOrUri? this.getSafeUriFromNameHintOrUri(nameHintOrUri): this.generateUriWithFragment();
    }

    protected createAndAddRegularThing(uri: string): Thing {
        const thing = ThingDefaultImpl.createThing(this, uri);
        this.addThing(thing);
        return thing;
    }

    public createThing(nameHintOrUri?: string): Thing {
        const uriOfNewRegularThing = this.validateOrCreateThingUri(nameHintOrUri);
        return this.createAndAddRegularThing(uriOfNewRegularThing);
    }

    public createThingWithoutUri(nameHint?: string): Thing {
        const thing = ThingDefaultImpl.createThingWithoutUri(this, nameHint);
        this.addThing(thing);
        return thing;
    }

    public deleteThing(): void {
        throw new Error("Method not implemented.");
    }

    public getUri(): string {
        return this._uri;
    }

    public setUri(uri: string): void {
        this._uri = uri;
        // compute change in every things
    }

    public isEmpty(): boolean {
        return this.countThings() === 0;
    }

    public getThingsAll(): Thing[] {
        return this._things;
    }

    public getThingThatSelfDescribes(): Thing | null {
        return this.getThing(this.getUri());
    }

    public countThings(): number {
        return this.getThingsAll().length;
    }

    public hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this.getThingsAll().some(thing => thing.getUri() === uri);
    }

    public filter(by: (subject?: string | Resource, property?: string, value?: string) => boolean): Thing {
        throw new Error("Not implemented");
    }

    public toRdfDatasetExt(): DatasetExt {
        const result = rdf.dataset();
        this._things.forEach(thing => {
            // @ts-ignore
            result.addAll(thing.toRdfDatasetExt())
        })
        return result;
    }

}

export default DocumentDefaultImpl;


/*protected createRdfQuad(subject: string | Document, property: string, value: string | Document, languageOrDatatype?: string | NamedNodeExt): QuadExt {
        let object = typeof value === 'string'? rdf.literal(value): value;
        
        let valueOrResource = value;
        if (typeof valueOrResource !== "string" && !this.isSemanticAnonymous(valueOrResource))
            value = valueOrResource.getSemanticId();

        if (typeof value === "string") {
            object = languageOrDatatype? rdf.literal(value, languageOrDatatype): rdf.namedNode(this.getSemantizer().expand(value));
        }

        const subject2 = rdf.namedNode(''); // typeof subject === "string"? rdf.namedNode(subject): subject, // or blank node

        return rdf.quad(
            subject2,
            rdf.namedNode(this.expand(property)),
            object // or blank node
        );
    }*/

/*public getStatementsAbout(subject: string | Document, property?: string): Document {
        const semanticId = typeof subject === 'string'? subject: subject.getSemanticId(); // manage self
        const dataset = this._rdfDataset.filter((quad: QuadExt) => quad.subject.toCanonical() === semanticId)
        return dataset? DocumentDefault.load(this.getSemantizer(), dataset): new DocumentDefault({ semantizer: this.getSemantizer() });
    }*/

    /*public getAllValuesAboutStatement(property: string, subject: string | Document = this): string[] {
        const subjectAsString = typeof subject === 'string'? subject: subject.getSemanticId();
        const iteratee = (r: any, q: any) => {
            if (q.subject.value === subjectAsString && q.predicate.value === this.getSemantizer().expand(property)) 
                r.push(this.getSemantizer().shorten(q.object.value))
            return r;
        }
        return this._rdfDataset.reduce(iteratee, []);
    }*/

    /*public getFirstStringValueAboutStatement(property: string, subject: string | Document = this): string | null {
        const values = this.getAllStringValuesAboutStatement(property, subject);
        return values.length >= 1? values[0]: null;
    }*/

    /*public getAllStringValuesAboutStatement(property: string, subject: string | Document = this): string[] {
        return this.getAllValuesAboutStatement(property, subject);
    }*/

    /*public getFirstRdfTypeValue(subject?: string | Document): string | null {
        const values = this.getAllRdfTypeValues(subject);
        return values.length >= 1? values[0]: null;
    }*/

    /*public getAllRdfTypeValues(subject?: string | Document): string[] {
        return this.getAllValuesAboutStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", subject);
    }*/

    /*public isSemanticTypeOf(semanticType: string): boolean {
        return this.hasStatementsAbout(this, "rdf:type", semanticType);
        //return this.getStatementsAbout(this, "rdf:type").includes(semanticType);
    }*/

    /*public removeSemanticId(): void {
        // compute change in graph -> to blank node
    }*/

    /*public getSemantizer(): Semantizer {
        return this._semantizer;
    }*/

    /*public static load(semantizer: Semantizer, rdfDataset: any): DocumentDefault {
        return new DocumentDefault({semantizer, rdfDataset});
    }*/

    /*public static create(semantizer: Semantizer, parameters?: ResourceCreationParameters): DocumentDefault {
        return new DocumentDefault({
            semantizer, 
            semanticId: parameters?.semanticId, 
            semanticType: parameters?.semanticType, 
            resources: parameters?.semanticContainedResource
        });
    }*/