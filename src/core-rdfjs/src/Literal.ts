import dataFactory from '@rdfjs/data-model';
import { NamedNode, Term, Literal } from "@rdfjs/types";

export class LiteralImpl implements Literal {
    private _literal: Literal;

    public termType: "Literal";
    public value: string;
    public language: string;
    public datatype: NamedNode<string>;
    
    public constructor(value: string, languageOrDatatype?: string | NamedNode) {
        this._literal = dataFactory.literal(value, languageOrDatatype);
        this.termType = this._literal.termType;
        this.value = this._literal.termType;
        this.language = this._literal.language;
        this.datatype = this._literal.datatype;
    }
    
    public equals(other: Term | null | undefined): boolean {
        return this._literal.equals(other);
    }
}

export default LiteralImpl;