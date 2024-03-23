import BlankNodeExt from "rdf-ext/lib/BlankNode";
import Semantizer, { ResourceCreationParameters } from "./Semantizer";
import Document from "./Document";
import rdf from 'rdf-ext';
import QuadExt from 'rdf-ext/lib/Quad';
import ResourceState from "./ResourceState";
import ResourceStateContainer from "./ResourceStateContainer";
import DatasetExt from "rdf-ext/lib/Dataset";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
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

export default class DocumentDefault implements Document {

    private _semantizer: Semantizer;
    private _rdfDataset: any;
    //private _semanticId?: string;
    private _mainResource: string | BlankNodeExt;
    //private _state?: ResourceState;

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
        
        // Load
        if (parameters.rdfDataset) {
            this._rdfDataset = parameters.rdfDataset;
            this._mainResource = ""; // TODO
        }
        
        // Create
        else {
            this._rdfDataset = rdf.dataset();
            this._mainResource = parameters.semanticId? parameters.semanticId: rdf.blankNode();

            if (parameters.semanticType) {
                this.setSemanticType(parameters.semanticType);
            }

            // Handle resources
        }
    }

    /*private extractSemanticTypes(semanticType?: SemanticType): string[] {
        return semanticType? [...semanticType]: [];
    }*/

    public getSemanticId(): string {
        return typeof this._mainResource === 'string'? this._mainResource: "blank node"; // TODO blank node id    
    }

    public setSemanticId(semanticId: string): void {
        this._mainResource = semanticId;
        // compute change in graph
    }

    public removeSemanticId(): void {
        // compute change in graph -> to blank node
        this._mainResource = rdf.blankNode();
    }

    public setSemanticType(semanticType: string | string[]): void {
        const semanticTypes = typeof semanticType === 'string'? [semanticType]: semanticType;
        semanticTypes.forEach(type => this.addValueForSemanticPropertyUrl("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", type));
    }

    public addSemanticContainedResource(...resource: Document[]): void {

    }

    /*public addValueForSemanticProperty(property: string, valueOrResource: string | Document, datatype?: string, language?: string): void {
        const languageOrDatatype = language? language: datatype? rdf.namedNode(datatype): undefined;
        this.addRdfQuad(this.createRdfQuad(this, property, valueOrResource, languageOrDatatype));
    }

    public addValueForSemanticPropertyBoolean(property: string, value: string): void {
        this.addValueForSemanticProperty(property, value, "xsd:boolean");
    }

    public addValueForSemanticPropertyDecimal(property: string, value: string): void {
        this.addValueForSemanticProperty(property, value, "xsd:decimal");
    }

    public addValueForSemanticPropertyInteger(property: string, value: string): void {
        this.addValueForSemanticProperty(property, value, "xsd:integer");
    }

    public addValueForSemanticPropertyDate(property: string, value: string): void {
        this.addValueForSemanticProperty(property, value, "xsd:date");
    }

    public addValueForSemanticPropertyDatetime(property: string, value: string): void {
        this.addValueForSemanticProperty(property, value, "xsd:datetime");
    }

    public addValueForSemanticPropertyTime(property: string, value: string): void {
        this.addValueForSemanticProperty(property, value, "xsd:time");
    }

    // Todo: handle default locale? No in this method but in the caller code.
    public addValueForSemanticPropertyString(property: string, value: string, locale?: string): void {
        this.addValueForSemanticProperty(property, value, "xsd:string", locale);
    }*/

    public getMainResource(): Document | undefined {
        return typeof this._mainResource === 'string'? this.getResource(this._mainResource): this;
    }

    public getStatementsAbout(subject: string | Document, property?: string): Document | undefined {
        const semanticId = typeof subject === 'string'? subject: subject.getSemanticId(); // manage self
        const dataset = this._rdfDataset.filter((quad: QuadExt) => quad.subject.toCanonical() === semanticId)
        return dataset? DocumentDefault.load(this.getSemantizer(), dataset): undefined;
    }

    public addStatementAbout(property: string, valueOrResource: string | Document, datatype?: string, subject: string | Document = this, language?: string): void {
        const languageOrDatatype = language? language: datatype? rdf.namedNode(datatype): undefined;
        this.addRdfQuad(this.createRdfQuad(this, property, valueOrResource, languageOrDatatype));
    }

    // Todo: handle default locale? No in this method but in the caller code.
    public addStringStatementAbout(property: string, value: string, locale?: string, subject: string | Document = this): void {
        this.addStatementAbout(property, value, "xsd:string", subject, locale);
    }

    public addBooleanStatementAbout(property: string, value: boolean, subject: string | Document = this): void {
        this.addStatementAbout(property, value.toString(), "xsd:boolean", subject);
    }

    public addDecimalStatementAbout(property: string, value: string, subject: string | Document = this): void {
        this.addStatementAbout(property, value, "xsd:decimal", subject);
    }

    public addIntegerStatementAbout(property: string, value: string, subject: string | Document = this): void {
        this.addStatementAbout(property, value, "xsd:integer", subject);
    }

    public addDateStatementAbout(property: string, value: string, subject: string | Document = this): void {
        this.addStatementAbout(property, value, "xsd:date", subject);
    }

    public addDatetimeStatementAbout(property: string, value: string, subject: string | Document = this): void {
        this.addStatementAbout(property, value, "xsd:datetime", subject);
    }

    public addTimeStatementAbout(property: string, value: string, subject: string | Document = this): void {
        this.addStatementAbout(property, value, "xsd:time", subject);
    }

    public countStatementsAbout(subject: string | Document): number {
        return 0;
    }

    public getResource(semanticId: string): Document | undefined {
        const dataset = this._rdfDataset.filter((quad: QuadExt) => quad.subject.toCanonical() === semanticId)
        return dataset? DocumentDefault.load(this.getSemantizer(), dataset): undefined;
    }

    public isSemanticAnonymous(): boolean {
        return typeof this._mainResource !== 'string';
    }

    // Can be removed and replaced by addValueForSemanticProperty?
    public addValueForSemanticPropertyUrl(property: string, valueOrResource: string | Document): void {
        this.addValueForSemanticProperty(property, valueOrResource);
    }

    public countContainedResources(): number {
        return 0;
    }

    public isSemanticTypeOf(semanticType: string): boolean {
        return this.getAllValuesOfSemanticPropertyUrl("rdf:type").includes(semanticType);
    }

    public getAllValuesOfSemanticPropertyUrl(property: string): string[] {
        return [];
    }

    /*public isDocument(): boolean {
        return !this.isContainer && this.countContainedResources() > 1;
    }

    public isContainer(): boolean {
        return this.isTypeOf("ldp:Container");
    }
    
    public isObject(): boolean {
        return !this.isContainer && this.countContainedResources() === 1;
    }*/
    
    public getContainedResources(): Document[] {
        throw new Error("Method not implemented.");
    }

    protected addRdfQuad(quad: QuadExt): void {
        this._rdfDataset.add(quad);
    }

    /*protected changeState(state: ResourceState): void {
        this._state = state;
    }*/

    protected createRdfQuad(subject: string | Document, property: string, value: string | Document, languageOrDatatype?: string | NamedNodeExt): QuadExt {
        let object = value;

        let valueOrResource = value;
        if (typeof valueOrResource !== "string" && !this.isSemanticAnonymous(valueOrResource))
            value = valueOrResource.getSemanticId();

        if (typeof value === "string") {
            object = languageOrDatatype? rdf.literal(value, languageOrDatatype): rdf.namedNode(this.getSemantizer().expand(value));
        }

        

        return rdf.quad(
            typeof subject === "string"? rdf.namedNode(subject): subject, // or blank node
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