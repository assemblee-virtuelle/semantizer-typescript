import Resource from "./Resource";
import Thing from "./Thing";
import ThingDefaultImpl from "./ThingDefaultImpl";
import ThingState from "./ThingState";
import rdf from 'rdf-ext';
import QuadExt from 'rdf-ext/lib/Quad';
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import Context from "./Context";
import DatasetExt from "rdf-ext/lib/Dataset";

export default class ThingStateRegular implements ThingState {

    private _uri: string;
    private _thing: Thing;
    private _rdfjsDataset: any;

    constructor(thing: Thing, uri: string) {
        this._rdfjsDataset = rdf.dataset();
        this._thing = thing;
        this._uri = uri;
    }

    public getThing(): Thing {
        return this._thing;
    }

    public getUri(): string {
        return this._uri;
    }

    public isAnonymous(): boolean {
        return false;
    }

    protected getDataset(): any {
        return this._rdfjsDataset;
    }

    public getContext(): Context | undefined {
        return this.getThing().getContext();
    }

    public expand(uri: string): string {
        return this.getThing().expand(uri);
    }

    public shorten(uri: string): string {
        return this.getThing().shorten(uri);
    }

    public addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing {
        const languageOrDatatype = language? language: datatype? rdf.namedNode(datatype): undefined;
        this.addRdfQuad(this.createRdfQuad(about, value, languageOrDatatype));
        return this.getThing();
    }

    protected addRdfQuad(quad: QuadExt): void {
        this.getDataset().add(quad);
    }

    public getAllValuesAboutStatement(property: string): string[] {
        const iteratee = (r: any, q: any) => {
            if (q.predicate.value === this.expand(property)) 
                r.push(this.shorten(q.object.value))
            return r;
        }
        return this.getDataset().reduce(iteratee, []);
    }

    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt {
        let object = typeof value === 'string'? rdf.literal(value): rdf.namedNode(value.getUri());

        return rdf.quad(
            rdf.namedNode(this.getUri()),
            rdf.namedNode(this.expand(property)),
            object // or blank node
        );
    }

    public toRdfDatasetExt(): DatasetExt {
        return this._rdfjsDataset.clone();
    }

}