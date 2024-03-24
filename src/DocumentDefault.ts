import BlankNodeExt from "rdf-ext/lib/BlankNode";
import Semantizer, { ResourceCreationParameters } from "./Semantizer";
import Document from "./Document";
import rdf from 'rdf-ext';
import QuadExt from 'rdf-ext/lib/Quad';
import ResourceState from "./ResourceState";
import ResourceStateContainer from "./ResourceStateContainer";
import DatasetExt from "rdf-ext/lib/Dataset";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import Thing from "./Thing";
//import * as RDF from "@rdfjs/types";

// states: Object | Document | Container
// states: Local | Distant
// states: Created | Modified | Loaded

interface ConstructionParameters {
    semantizer: Semantizer;
    rdfDataset?: any;
    semanticId?: string;
    semanticType?: string | string[];
    resources?: Document | Document[];
}

export class DocumentDefault implements Document {

    private _semantizer: Semantizer;
    private _rdfDataset: any;
    private _semanticId: string;
    private _things: Thing[];

    public static load(semantizer: Semantizer, rdfDataset: any): DocumentDefault {
        return new DocumentDefault({semantizer, rdfDataset});
    }

    /**
     * 
     * @param semantizer 
     * @param parameters semanticId = uri or name of blank node
     * @returns 
     */
    public static create(semantizer: Semantizer, parameters?: ResourceCreationParameters): DocumentDefault {
        return new DocumentDefault({
            semantizer, 
            semanticId: parameters?.semanticId, 
            semanticType: parameters?.semanticType, 
            resources: parameters?.semanticContainedResource
        });
    }

    protected constructor(parameters: ConstructionParameters) {
        this._semantizer = parameters.semantizer;
        this._semanticId = parameters.semanticId ?? "";
        this._things = [];
        
        // Load
        if (parameters.rdfDataset) {
            this._rdfDataset = parameters.rdfDataset;
        }
        
        // Create
        else {
            this._rdfDataset = rdf.dataset();

            if (parameters.semanticType) {
                const semanticTypes = typeof parameters.semanticType === 'string'? [parameters.semanticType]: parameters.semanticType;
                semanticTypes.forEach(type => this.addRdfTypeStatement(type));
            }

            // Handle resources
        }
    }

    public getSemanticId(): string {
        return this._semanticId;
    }

    public setSemanticId(semanticId: string): void {
        this._semanticId = semanticId;
        // compute change in graph
    }

    public removeSemanticId(): void {
        // compute change in graph -> to blank node
    }

    public isEmpty(): boolean {
        return this.countStatementsAbout(this) > 0;
    }

    public getStatementsAbout(subject: string | Document, property?: string): Document {
        const semanticId = typeof subject === 'string'? subject: subject.getSemanticId(); // manage self
        const dataset = this._rdfDataset.filter((quad: QuadExt) => quad.subject.toCanonical() === semanticId)
        return dataset? DocumentDefault.load(this.getSemantizer(), dataset): new DocumentDefault({ semantizer: this.getSemantizer() });
    }

    public getAllValuesAboutStatement(property: string, subject: string | Document = this): string[] {
        const subjectAsString = typeof subject === 'string'? subject: subject.getSemanticId();
        const iteratee = (r: any, q: any) => {
            if (q.subject.value === subjectAsString && q.predicate.value === this.getSemantizer().expand(property)) 
                r.push(this.getSemantizer().shorten(q.object.value))
            return r;
        }
        return this._rdfDataset.reduce(iteratee, []);
    }

    public addStatementAbout(property: string, valueOrResource: string | Document, subject: string | Document = this, datatype?: string, language?: string): void {
        const languageOrDatatype = language? language: datatype? rdf.namedNode(datatype): undefined;
        this.addRdfQuad(this.createRdfQuad(subject, property, valueOrResource, languageOrDatatype));
    }

    public getFirstStringValueAboutStatement(property: string, subject: string | Document = this): string | null {
        const values = this.getAllStringValuesAboutStatement(property, subject);
        return values.length >= 1? values[0]: null;
    }

    public getAllStringValuesAboutStatement(property: string, subject: string | Document = this): string[] {
        return this.getAllValuesAboutStatement(property, subject);
    }

    public addRdfTypeStatement(value: string | Document, subject?: string | Document): void {
        this.addStatementAbout("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value, subject);
    }

    // Todo: handle default locale? No in this method but in the caller code.
    public addStringStatementAbout(property: string, value: string, locale?: string, subject: string | Document = this): void {
        this.addStatementAbout(property, value, subject, "xsd:string", locale);
    }

    public addBooleanStatementAbout(property: string, value: boolean, subject: string | Document = this): void {
        this.addStatementAbout(property, value.toString(), subject, "xsd:boolean");
    }

    public addDecimalStatementAbout(property: string, value: number, subject: string | Document = this): void {
        this.addStatementAbout(property, value.toString(), subject, "xsd:decimal");
    }

    public addIntegerStatementAbout(property: string, value: number, subject: string | Document = this): void {
        this.addStatementAbout(property, value.toString(), subject, "xsd:integer");
    }

    public addDateStatementAbout(property: string, value: Date, subject: string | Document = this): void {
        this.addStatementAbout(property, value.toString(), subject, "xsd:date");
    }

    public addDatetimeStatementAbout(property: string, value: Date, subject: string | Document = this): void {
        this.addStatementAbout(property, value.toString(), subject, "xsd:datetime");
    }

    public addTimeStatementAbout(property: string, value: Date, subject: string | Document = this): void {
        this.addStatementAbout(property, value.toString(), subject, "xsd:time");
    }

    public countStatementsAbout(subject: string | Document = this, property?: string): number {
        return 0;
    }

    public countThings(): number {
        return 0;
    }

    public getFirstRdfTypeValue(subject?: string | Document): string | null {
        const values = this.getAllRdfTypeValues(subject);
        return values.length >= 1? values[0]: null;
    }

    public getAllRdfTypeValues(subject?: string | Document): string[] {
        return this.getAllValuesAboutStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", subject);
    }

    public hasStatementsAbout(subject: string | Document = this, property: string, ...hasValues: string[]): boolean {
        return true;
    }

    public isSemanticTypeOf(semanticType: string): boolean {
        return this.hasStatementsAbout(this, "rdf:type", semanticType);
        //return this.getStatementsAbout(this, "rdf:type").includes(semanticType);
    }

    protected addRdfQuad(quad: QuadExt): void {
        this._rdfDataset.add(quad);
    }

    public filter(by: (subject?: string | Document, property?: string, value?: string) => boolean): Document {
        return new DocumentDefault({ semantizer: this.getSemantizer() });
    }

    public addStatementFrom(source: Document, subject: string | Document = this): void {

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
            rdf.namedNode(this.getSemantizer().expand(property)),
            object // or blank node
        );
    }

    public getSemantizer(): Semantizer {
        return this._semantizer;
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