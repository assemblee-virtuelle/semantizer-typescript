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
export default class SemanticObject {
    constructor(parameters) {
        this._semantizer = parameters.semantizer;
        this._semanticId = parameters.other ? parameters.other.getSemanticId() : parameters.semanticId;
        this._rdfDataset = parameters.other ? parameters.other.toRdfDatasetExt() : rdf.dataset();
        this.init(parameters.semanticType);
    }
    /**
     * This method should be called to initialize properly a blank node.
     * Because the blank node is created after the constructor of SemanticObject.
     * This method should be deleted when SemanticObjectAnonymous will be removed.
     * @param type The type to coming from the constructor.
     */
    init(type) {
        if (type)
            this.addSemanticPropertyReferenceId('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', type);
    }
    getContext() {
        return this.getSemantizer().getContext();
    }
    getSemantizer() {
        return this._semantizer;
    }
    addRdfQuad(quad) {
        this._rdfDataset.add(quad);
    }
    addSemanticPropertyReferenceId(property, value, replace = false) {
        if (replace)
            this.deleteRdfProperty(property);
        const quad = this.createRdfQuad(property, value);
        this.addRdfQuad(quad);
    }
    addSemanticPropertyReference(property, value, replace = false) {
        this.addSemanticPropertyReferenceId(property, value.getSemanticId(), replace);
    }
    addSemanticPropertyLiteral(property, value, replace = false) {
        if (replace)
            this.deleteRdfProperty(property);
        const quad = this.createRdfQuadLiteral(property, value.toString());
        this.addRdfQuad(quad);
    }
    addSemanticPropertyAnonymous(property, anonymous, replace = false) {
        if (replace)
            this.deleteRdfProperty(property);
        if (!anonymous.isSemanticObjectAnonymous())
            throw new Error("Can't add a semantic property anonymous: the object is not anonymous.");
        const blankNodeQuad = anonymous.getSemanticObjectAnonymous();
        const quad = this.createRdfQuadBlankNode(property, blankNodeQuad);
        this.addRdfQuad(quad);
        this._rdfDataset.addAll(anonymous.toRdfDatasetExt());
    }
    clone() {
        return new SemanticObject({ semantizer: this.getSemantizer(), semanticId: this._semanticId, other: this });
    }
    createRdfQuad(property, value) {
        return rdf.quad(rdf.namedNode(this.getSemanticId()), rdf.namedNode(this.getSemantizer().expand(property)), rdf.namedNode(this.getSemantizer().expand(value)));
    }
    static createFromRdfDataset(semantizer, dataset) {
        const result = new SemanticObject({ semantizer: semantizer, semanticId: "", semanticType: "" });
        result.setSemanticPropertyAllFromRdfDataset(dataset);
        return result;
    }
    createRdfQuadLiteral(property, value) {
        return rdf.quad(rdf.namedNode(this.getSemanticId()), rdf.namedNode(this.getSemantizer().expand(property)), rdf.literal(value));
    }
    createRdfQuadBlankNode(property, blankNodeQuad) {
        return rdf.quad(rdf.namedNode(this.getSemanticId()), rdf.namedNode(this.getSemantizer().expand(property)), blankNodeQuad);
    }
    deleteRdfProperty(property) {
        property = this.getSemantizer().expand(property);
        this._rdfDataset.deleteMatches(this.getSemanticId(), property);
    }
    /**
     *
     * @param other
     * @returns
     * @note We can't use the equals method from the RDF dataset directly because it needs the
     * quads to be in the same order.
     */
    equals(other) {
        let result = false;
        if (this._semanticId === other.getSemanticId())
            result = this.hasSameProperties(other);
        return result;
    }
    getSemanticObjectAnonymous() {
        throw new Error("Can't get the semantic object anonymous: this semantic object is not anonymous.");
    }
    getSemanticId() {
        return this._semanticId;
    }
    getSemanticType() {
        return this.getSemanticProperty('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
    }
    getSemanticProperty(property) {
        return this.hasSemanticProperty(property) ? this.getSemanticPropertyAll(property)[0] : undefined;
    }
    /**
     *
     * @param property
     * @returns an array containing the value of all the quad objects.
     */
    getSemanticPropertyAll(property) {
        const iteratee = (r, q) => {
            if (q.predicate.value === this.getSemantizer().expand(property))
                r.push(this.getSemantizer().shorten(q.object.value));
            return r;
        };
        return this._rdfDataset.reduce(iteratee, []);
    }
    getSemanticPropertyAnonymous(property) {
        const blankNodeId = this.getSemanticProperty(property);
        return this.getSemanticPropertyAnonymousId(blankNodeId);
    }
    getSemanticPropertyAnonymousAll(property) {
        const results = [];
        const blankNodeIds = this.getSemanticPropertyAll(property);
        blankNodeIds.forEach(blankNodeId => results.push(this.getSemanticPropertyAnonymousId(blankNodeId)));
        return results;
    }
    getSemanticPropertyAnonymousId(blankNodeId) {
        return this._rdfDataset.filter((q) => q.subject.value === blankNodeId);
    }
    getSize() {
        return this._rdfDataset.size;
    }
    hasSameProperties(other) {
        let result = false;
        if (this.getSize() === other.getSize()) {
            const otherDataset = other.toRdfDatasetExt();
            for (const quad of this._rdfDataset) {
                const filter = ((otherQuad) => {
                    const language = quad.object.termType === "Literal" ? quad.object.language === otherQuad.object.language : true;
                    return quad.subject.value === otherQuad.subject.value &&
                        quad.predicate.value === otherQuad.predicate.value &&
                        quad.object.termType === otherQuad.object.termType &&
                        quad.object.value === otherQuad.object.value &&
                        language;
                });
                const otherQuads = otherDataset.filter(filter);
                if (otherQuads.size !== 1) {
                    return false;
                }
            }
            result = true;
        }
        return result;
    }
    hasSemanticProperty(property) {
        property = this.getSemantizer().expand(property);
        return this._rdfDataset.some((q, ds) => q.predicate.value === property);
    }
    isSemanticObjectAnonymous() {
        return false;
    }
    isSemanticSameTypeOf(other) {
        return other.isSemanticTypeOf(this.getSemanticType());
    }
    isSemanticTypeOf(type) {
        return this.getSemantizer().expand(this.getSemanticType()) === this.getSemantizer().expand(type);
    }
    removeSemanticProperty(property) {
        throw new Error("Method not yet implemented.");
    }
    setSemanticPropertyReference(property, value) {
        this.addSemanticPropertyReference(property, value, true);
    }
    setSemanticPropertyReferenceId(property, value) {
        this.addSemanticPropertyReferenceId(property, value, true);
    }
    setSemanticPropertyLiteral(property, value) {
        this.addSemanticPropertyLiteral(property, value, true);
    }
    setSemanticPropertyAnonymous(property, anonymous) {
        this.addSemanticPropertyAnonymous(property, anonymous, true);
    }
    setSemanticId(semanticId) {
        throw new Error("Method not yet implemented.");
    }
    setSemanticPropertyAllFromRdfDataset(dataset) {
        this._rdfDataset = dataset.clone();
        const datasetArray = Array.from(this._rdfDataset);
        if (datasetArray.length > 0) {
            const firstQuad = datasetArray[0];
            // @ts-ignore
            this._semanticId = firstQuad.subject.value;
        }
    }
    /**
     * Return a deep copy of the underlying RDF dataset.
     * @returns
     */
    toRdfDatasetExt() {
        return this._rdfDataset.clone();
    }
}
//# sourceMappingURL=SemanticObject.js.map