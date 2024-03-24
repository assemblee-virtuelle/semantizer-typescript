import BlankNodeExt from "rdf-ext/lib/BlankNode";
import Semantizer, { ResourceCreationParameters } from "./Semantizer";
import { Document, ConstructionParameters } from "./Document";
import rdf from 'rdf-ext';
import QuadExt from 'rdf-ext/lib/Quad';
import ThingState from "./ThingState";
import ThingStateRegular from "./ThingStateRegular";
import DatasetExt from "rdf-ext/lib/Dataset";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import Thing from "./Thing";
import Resource from "./Resource";
import Context from "./Context";
import ThingDefaultImpl from "./ThingDefaultImpl";
//import * as RDF from "@rdfjs/types";

// states: Object | Document | Container
// states: Local | Distant
// states: Created | Modified | Loaded

export class DocumentDefault implements Document {

    private _rdfDataset: any;
    private _uri: string;
    private _things: Thing[];
    private _context?: Context;

    public constructor(parameters?: ConstructionParameters) {
        this._context = parameters?.context;
        this._uri = parameters?.uri ?? "";
        this._things = [];
        
        // Load
        if (parameters?.rdfDataset) {
            this._rdfDataset = parameters.rdfDataset;
        }
        
        // Create
        else {
            this._rdfDataset = rdf.dataset();

            /*if (parameters.semanticType) {
                const semanticTypes = typeof parameters.semanticType === 'string'? [parameters.semanticType]: parameters.semanticType;
                semanticTypes.forEach(type => this.addRdfTypeStatement(type));
            }*/

            // Handle resources
        }
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
        throw new Error("Method not implemented.");
    }

    public addDocument(document: Document): Document {
        throw new Error("Method not implemented.");
    }

    public getThing(uri: string): Thing | null {
        throw new Error("Method not implemented.");
    }

    public createSelfDescribingThing(): Thing {
        const thing = new ThingDefaultImpl(this, this.getUri(), this.getContext());
        this.addThing(thing);
        return thing;
    }

    public createThing(nameHintOrUri?: string): Thing {
        const thing = new ThingDefaultImpl(this, nameHintOrUri, this.getContext());
        this.addThing(thing);
        return thing;
    }

    public createAnonymousThing(nameHint?: string): Thing {
        const thing = new ThingDefaultImpl(this, nameHint, this.getContext());
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
        // compute change in graph
    }

    public isEmpty(): boolean {
        return this.countThings() === 0;
    }

    public getAllThings(): Thing[] {
        return this._things;
    }

    public countThings(): number {
        return this.getAllThings().length;
    }

    public hasStatementsAbout(subject: string | Resource = this, property: string, ...hasValues: string[]): boolean {
        return true;
    }

    protected addRdfQuad(quad: QuadExt): void {
        this._rdfDataset.add(quad);
    }

    public filter(by: (subject?: string | Resource, property?: string, value?: string) => boolean): Thing {
        throw new Error("Not implemented");
    }

    protected createRdfQuad(subject: string | Document, property: string, value: string | Document, languageOrDatatype?: string | NamedNodeExt): QuadExt {
        let object = typeof value === 'string'? rdf.literal(value): value;
        /*
        let valueOrResource = value;
        if (typeof valueOrResource !== "string" && !this.isSemanticAnonymous(valueOrResource))
            value = valueOrResource.getSemanticId();

        if (typeof value === "string") {
            object = languageOrDatatype? rdf.literal(value, languageOrDatatype): rdf.namedNode(this.getSemantizer().expand(value));
        }

        */

        const subject2 = rdf.namedNode(''); // typeof subject === "string"? rdf.namedNode(subject): subject, // or blank node

        return rdf.quad(
            subject2,
            rdf.namedNode(this.expand(property)),
            object // or blank node
        );
    }

    

    /**
     * Return a deep copy of the underlying RDF dataset.
     * @returns 
     */
    public toRdfDatasetExt(): DatasetExt {
        return this._rdfDataset.clone();
    }

}

export default DocumentDefault;



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