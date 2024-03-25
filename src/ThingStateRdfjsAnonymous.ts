import Resource from "./Resource";
import Thing from "./Thing";
import rdf from 'rdf-ext'
import ThingStateRdfjsBase from "./ThingStateRdfjsBase.js";
import BlankNodeExt from "rdf-ext/lib/BlankNode";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import QuadExt from "rdf-ext/lib/Quad";

export class ThingStateRdfjsAnonymous extends ThingStateRdfjsBase {

    private _blankNode: BlankNodeExt; // helper: we keep a pointer to the blank node quad

    public constructor(thing: Thing, nameHint?: string) {
        super(thing, '');
        this._blankNode = rdf.blankNode(nameHint);
    }

    protected getBlankNode(): BlankNodeExt {
        return this._blankNode;
    }
    
    public getUri(): string {
        // @ts-ignore
        return this.getBlankNode().value;
    }

    public isAnonymous(): boolean {
        return true;
    }

    public addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing {
        const languageOrDatatype = language? language: datatype? rdf.namedNode(datatype): undefined;
        this.addRdfQuad(this.createRdfQuad(about, value, languageOrDatatype));
        return this.getThing();
    }

    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt {
        let object = typeof value === 'string'? rdf.literal(value): rdf.namedNode(value.getUri());

        return rdf.quad(
            this.getBlankNode(),
            rdf.namedNode(this.expand(property)),
            object // or blank node
        );
    }

}

export default ThingStateRdfjsAnonymous;