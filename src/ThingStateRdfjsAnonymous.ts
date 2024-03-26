import Resource from "./Resource";
import Thing from "./Thing";
import rdf from 'rdf-ext'
import ThingStateRdfjsRegular from "./ThingStateRdfjsRegular.js";
import BlankNodeExt from "rdf-ext/lib/BlankNode";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import QuadExt from "rdf-ext/lib/Quad";

export class ThingStateRdfjsAnonymous extends ThingStateRdfjsRegular {

    private _blankNode: BlankNodeExt; // helper: we keep a pointer to the blank node quad

    public constructor(thing: Thing, nameHint?: string) {
        super(thing, '');
        this._blankNode = rdf.blankNode(nameHint);
        this.addRdfQuad(this.createRdfQuad("", "")); // internal use
    }

    protected getBlankNode(): BlankNodeExt {
        return this._blankNode;
    }
    
    public getUri(): string {
        return this.getBlankNode().toCanonical();
    }

    public isAnonymous(): boolean {
        return true;
    }

    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt {
        return rdf.quad(
            this.getBlankNode(),
            rdf.namedNode(this.expand(property)),
            this.getLiteralOrNamedNodeOrBlankNode(value, languageOrDatatype)
        );
    }

}

export default ThingStateRdfjsAnonymous;