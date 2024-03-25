import Resource from "./Resource";
import Thing from "./Thing";
import rdf from 'rdf-ext';
import QuadExt from 'rdf-ext/lib/Quad';
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import ThingStateRdfjsBase from "./ThingStateRdfjsBase.js";

export class ThingStateRdfjsRegular extends ThingStateRdfjsBase {

    constructor(thing: Thing, uri: string) {
        super(thing, uri);
    }

    public isAnonymous(): boolean {
        return false;
    }

    public addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing {
        const languageOrDatatype = language? language: datatype? rdf.namedNode(datatype): undefined;
        this.addRdfQuad(this.createRdfQuad(about, value, languageOrDatatype));
        return this.getThing();
    }

    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt {
        let object = typeof value === 'string'? rdf.literal(value): rdf.namedNode(value.getUri());

        return rdf.quad(
            rdf.namedNode(this.getUri()),
            rdf.namedNode(this.expand(property)),
            object // or blank node
        );
    }

}

export default ThingStateRdfjsRegular;