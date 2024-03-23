/*
Copyright (c) 2023 Maxime Lecoq <maxime@lecoqlibre.fr>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import rdf from 'rdf-ext'
import BlankNodeExt from 'rdf-ext/lib/BlankNode.js';
import Semanticable from './Semanticable.js';
import SemanticObject from "./SemanticObject.js";
import Semantizer from './Semantizer.js';

/**
 * The SemanticObject class is the base implementation of the Semanticable 
 * interface. It allows an object to store semantic properties and to be 
 * serialized. To add a semantic property to that object, use the 
 * registerSemanticProperty methods.
 * 
 * @see The Semanticable interface.
 * @see The Propertyable interface.
 * @see The registerSemanticProperty() method.
 */
export default class SemanticObjectAnonymous extends SemanticObject {

    private _blankNode: BlankNodeExt | undefined; // helper: we keep a pointer to the blank node quad
    
    public constructor(parameters: {semantizer: Semantizer, semanticId: string, semanticType?: string});
    public constructor(parameters: {semantizer: Semantizer, semanticId: string, other: Semanticable});
    public constructor(parameters: {semantizer: Semantizer, semanticId?: string, semanticType?: string, other?: Semanticable}) {
        if (parameters.other) {
            super({ semantizer: parameters.semantizer, semanticId: parameters.semanticId!, other: parameters.other });
            if (!parameters.other.isSemanticObjectAnonymous())
                throw new Error("Can't create a new SemanticObjectAnonymous from a copy: the copy is not a SemanticObjectAnonymous.");
        }
        else super({ semantizer: parameters.semantizer, semanticId: parameters.semanticId!, semanticType: parameters.semanticType! });
    }

    protected init(type?: string): void {
        this._blankNode = rdf.blankNode(this.getSemanticId());
        super.init(type);
    }

    protected createRdfQuad(property: string, value: string): any {
        return rdf.quad(
            this._blankNode,
            rdf.namedNode(this.getSemantizer().expand(property)),
            rdf.namedNode(this.getSemantizer().expand(value))
        )
    }

    protected createRdfQuadLiteral(property: string, value: string): any {
        return rdf.quad(
            this._blankNode,
            rdf.namedNode(this.getSemantizer().expand(property)),
            rdf.literal(value)
        )
    }

    protected createRdfQuadBlankNode(property: string, blankNodeQuad: any): any {
        return rdf.quad(
            this._blankNode,
            rdf.namedNode(this.getSemantizer().expand(property)),
            blankNodeQuad
        )
    }

    public equals(other: Semanticable): boolean {
        return this.hasSameProperties(other);
    }

    public getSemanticObjectAnonymous(): any {
        return this._blankNode;
    }

    public isSemanticObjectAnonymous(): boolean {
        return true;
    }

}