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
import rdf from 'rdf-ext';
import SemanticObject from "./SemanticObject.js";
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
    constructor(parameters) {
        if (parameters.other) {
            super({ semantizer: parameters.semantizer, semanticId: parameters.semanticId, other: parameters.other });
            if (!parameters.other.isSemanticObjectAnonymous())
                throw new Error("Can't create a new SemanticObjectAnonymous from a copy: the copy is not a SemanticObjectAnonymous.");
        }
        else
            super({ semantizer: parameters.semantizer, semanticId: parameters.semanticId, semanticType: parameters.semanticType });
    }
    init(type) {
        this._blankNode = rdf.blankNode(this.getSemanticId());
        super.init(type);
    }
    createRdfQuad(property, value) {
        return rdf.quad(this._blankNode, rdf.namedNode(this.getSemantizer().expand(property)), rdf.namedNode(this.getSemantizer().expand(value)));
    }
    createRdfQuadLiteral(property, value) {
        return rdf.quad(this._blankNode, rdf.namedNode(this.getSemantizer().expand(property)), rdf.literal(value));
    }
    createRdfQuadBlankNode(property, blankNodeQuad) {
        return rdf.quad(this._blankNode, rdf.namedNode(this.getSemantizer().expand(property)), blankNodeQuad);
    }
    equals(other) {
        return this.hasSameProperties(other);
    }
    getSemanticObjectAnonymous() {
        return this._blankNode;
    }
    isSemanticObjectAnonymous() {
        return true;
    }
}
//# sourceMappingURL=SemanticObjectAnonymous.js.map