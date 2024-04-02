import rdf from 'rdf-ext';
import BlankNodeExt from "rdf-ext/lib/BlankNode";
import DatasetExt from "rdf-ext/lib/Dataset";
import LiteralExt from "rdf-ext/lib/Literal";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import QuadExt from "rdf-ext/lib/Quad";
import Resource from "../core/Resource.js";
import Thing from "../core/Thing.js";
import { ThingStateDefaultBase } from "./ThingStateDefaultBase.js";

export class ThingStateRdfjsRegular extends ThingStateDefaultBase {

    private _rdfjsDataset: any;

    constructor(thing: Thing, uri: string) {
        super(thing, uri);
        this._rdfjsDataset = rdf.dataset();
    }

    protected getDataset(): any {
        return this._rdfjsDataset;
    }

    protected addRdfQuad(quad: QuadExt): void {
        this.getDataset().add(quad);
    }

    public toRdfDatasetExt(): DatasetExt {
        return this.getDataset().clone();
    }

    public equals(other: Thing): boolean {
        return this.getDataset().equals(other.toRdfDatasetExt());
    }

    public isAnonymous(): boolean {
        return false;
    }

    public getAllValuesAboutStatement(property: string): string[] {
        const iteratee = (r: any, q: any) => {
            if (q.predicate.value === this.expand(property)) 
                r.push(this.shorten(q.object.value))
            return r;
        }
        return this.getDataset().reduce(iteratee, []);
    }

    public addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing {
        const languageOrDatatype = language? language: datatype? rdf.namedNode(datatype): undefined;
        this.addRdfQuad(this.createRdfQuad(about, value, languageOrDatatype));
        return this.getThing();
    }

    protected isBlankNode(resource: Resource): boolean {
        return resource.getUri().startsWith('_:');
    }

    protected getDocumentDataset(): DatasetExt {
        return this.getThing().getDocument().toRdfDatasetExt();
    }

    protected getBlankNode(resource: Resource): BlankNodeExt {
        const blankNodeCanonicalName = resource.getUri();
        let result: BlankNodeExt | null = null;
        this.getDocumentDataset().forEach((quad: QuadExt) => {
            // @ts-ignore
            if (quad.subject.termType === "BlankNode" && quad.subject.toCanonical() === blankNodeCanonicalName) {
                result = quad.subject;
                return;
            }
        });
        if (!result)
            throw new Error(`Internal error: unable to find the blank node "${blankNodeCanonicalName}".`);
        return result;
    }

    protected getNamedNode(resource: Resource): NamedNodeExt {
        return rdf.namedNode(this.expand(resource.getUri()));
    }

    protected getLiteral(value: string, languageOrDatatype?: string | NamedNodeExt): LiteralExt {
        return rdf.literal(value, languageOrDatatype);
    }

    protected getNamedNodeOrBlankNode(resource: Resource): NamedNodeExt | BlankNodeExt {
        return this.isBlankNode(resource)? this.getBlankNode(resource): this.getNamedNode(resource);
    }

    protected getLiteralOrNamedNodeOrBlankNode(value: string | Resource, languageOrDatatype?: string | NamedNodeExt): LiteralExt | NamedNodeExt | BlankNodeExt {
        return typeof value === 'string'? this.getLiteral(value, languageOrDatatype): this.getNamedNodeOrBlankNode(value);
    }

    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt {
        return rdf.quad(
            rdf.namedNode(this.getUri()),
            rdf.namedNode(this.expand(property)),
            this.getLiteralOrNamedNodeOrBlankNode(value, languageOrDatatype)
        );
    }

}

export default ThingStateRdfjsRegular;