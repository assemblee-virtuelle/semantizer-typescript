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
import DatasetExt from 'rdf-ext/lib/Dataset';
import QuadExt from 'rdf-ext/lib/Quad';
import Semanticable from './Semanticable';
import SemanticObjectAnonymous from './SemanticObjectAnonymous';

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
export default class SemanticObject implements Semanticable {

    private _semanticId: string | undefined;
    private _rdfDataset: any;

    constructor(semanticId: string | undefined = undefined) {
        this._semanticId = semanticId;
        this._rdfDataset = rdf.dataset();
    }

    protected addRdfQuad(quad: any): void {
        this._rdfDataset.add(quad);
    }

    public addSemanticProperty(property: string, value: string, replace: boolean = false): void {
        if (replace)
            this.deleteRdfProperty(property);
        const quad = this.createRdfQuad(property, value);
        this.addRdfQuad(quad);
      }
    
    public addSemanticPropertyLiteral(property: string, value: string, replace: boolean = false): void {
        if (replace)
            this.deleteRdfProperty(property);
        const quad = this.createRdfQuadLiteral(property, value);
        this.addRdfQuad(quad);
    }

    public addSemanticPropertyAnonymous(property: string, anonymous: SemanticObjectAnonymous, replace: boolean = false): void {
        if (replace)
            this.deleteRdfProperty(property);
        const blankNodeDataset = anonymous._rdfDataset;
        const blankNodeQuad = Array.from(blankNodeDataset)[0]; // warning here
        const quad = this.createRdfQuadBlankNode(property, blankNodeQuad);
        this.addRdfQuad(quad);
    }

    protected createRdfQuad(property: string, value: string): any {
        return rdf.quad(
            rdf.namedNode(this.getSemanticId()),
            rdf.namedNode(property),
            rdf.namedNode(value)
        )
    }

    public static createFromRdfDataset(dataset: DatasetExt): SemanticObject {
        const result = new SemanticObject();
        result.setSemanticPropertyAllFromRdfDataset(dataset);
        return result;
    }

    protected createRdfQuadLiteral(property: string, value: string): any {
        return rdf.quad(
            rdf.namedNode(this.getSemanticId()),
            rdf.namedNode(property),
            rdf.literal(value)
        )
    }

    protected createRdfQuadBlankNode(property: string, blankNodeQuad: any): any {
        return rdf.quad(
            rdf.namedNode(this.getSemanticId()),
            rdf.namedNode(property),
            blankNodeQuad
        )
    }

    protected deleteRdfProperty(property: string): void {
        this._rdfDataset.deleteMatches(this.getSemanticId(), property);
    }

    public equals(other: SemanticObject): boolean {
        return this._rdfDataset.equals(other._rdfDataset);
    }

    public getSemanticId(): string {
        return this._semanticId ?? "";
    }

    public getSemanticType(){
        return this.getSemanticProperty('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
    }

    public getSemanticProperty(property: string): any {
        return this.hasSemanticProperty(property)? this.getSemanticPropertyAll(property)[0]: undefined;
    }

    /**
     * 
     * @param property 
     * @returns an array containing the value of all the quad objects.
     */
    public getSemanticPropertyAll(property: string): any[] {
        const iteratee = (r: any, q: any) => {
            if (q.predicate.value === property) 
                r.push(q.object.value)
            return r;
        }
        return this._rdfDataset.reduce(iteratee, []);
    }

    public hasSemanticProperty(property: string): boolean {
        return this._rdfDataset.some((q: any, ds: any) => q.predicate.value === property);
    }

    public removeSemanticProperty(property: string): void {
        throw new Error("Method not yet implemented.");
    } 

    public setSemanticPropertyReference(property: string, value: string): void {
        this.addSemanticProperty(property, value, true);
    }

    public setSemanticPropertyLiteral(property: string, value: string): void {
        this.addSemanticPropertyLiteral(property, value, true);
    }

    public setSemanticPropertyAnonymous(property: string, anonymous: SemanticObjectAnonymous): void {
        this.addSemanticPropertyAnonymous(property, anonymous, true);
    }

    public setSemanticId(semanticId: string): void {
        throw new Error("Method not yet implemented.");
    }

    public setSemanticType(type: string): void {
        this.setSemanticPropertyReference('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', type);
    }

    public setSemanticPropertyAllFromRdfDataset(dataset: DatasetExt): void {
        this._rdfDataset = dataset.clone();
        const datasetArray: QuadExt[] = Array.from(this._rdfDataset);
        if (datasetArray.length > 0) {
            const firstQuad: QuadExt = datasetArray[0];
            // @ts-ignore
            this._semanticId = firstQuad.subject.value;
        }
    }

    /**
     * Return a deep copy of the underlying RDF dataset.
     * @returns 
     */
    public toRdfDataset(): DatasetExt {
        return this._rdfDataset.clone();
    }

}