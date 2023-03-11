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

    private _semanticId: string;
    private _semanticType: string;
    private _rdfDataset: any;

    public constructor(parameters: {semanticId: string, semanticType: string});
    public constructor(parameters: {semanticId: string, other: Semanticable});
    public constructor(parameters: {semanticId?: string, semanticType?: string, other?: Semanticable}) {
        this._semanticId = parameters.other? parameters.other.getSemanticId(): parameters.semanticId!;
        this._rdfDataset = parameters.other? parameters.other.toRdfDataset(): rdf.dataset();
        this._semanticType = parameters.other? parameters.other.getSemanticType(): parameters.semanticType!;
        this.init();
    }

    protected addRdfQuad(quad: any): void {
        this._rdfDataset.add(quad);
    }

    protected init(): void {
        this.addSemanticPropertyReferenceId('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', this._semanticType);
    }

    private addSemanticPropertyReferenceId(property: string, value: string, replace: boolean = false): void {
        if (replace)
            this.deleteRdfProperty(property);
        const quad = this.createRdfQuad(property, value);
        this.addRdfQuad(quad);
    }

    public addSemanticPropertyReference(property: string, value: Semanticable, replace: boolean = false): void {
        this.addSemanticPropertyReferenceId(property, value.getSemanticId(), replace);
    }
    
    public addSemanticPropertyLiteral(property: string, value: string | number | boolean, replace: boolean = false): void {
        if (replace)
            this.deleteRdfProperty(property);
        const quad = this.createRdfQuadLiteral(property, value.toString());
        this.addRdfQuad(quad);
    }

    public addSemanticPropertyAnonymous(property: string, anonymous: Semanticable, replace: boolean = false): void {
        if (replace)
            this.deleteRdfProperty(property);

        if (!anonymous.isSemanticObjectAnonymous())
            throw new Error("Can't add a semantic property anonymous: the object is not anonymous.");

        const blankNodeQuad = anonymous.getSemanticObjectAnonymous();
        const quad = this.createRdfQuadBlankNode(property, blankNodeQuad);
        this.addRdfQuad(quad);
        this._rdfDataset.addAll(anonymous.toRdfDataset());
    }

    public clone(): SemanticObject {
        return new SemanticObject({ semanticId: this._semanticId, other: this });
    }

    protected createRdfQuad(property: string, value: string): any {
        return rdf.quad(
            rdf.namedNode(this.getSemanticId()),
            rdf.namedNode(property),
            rdf.namedNode(value)
        )
    }

    public static createFromRdfDataset(dataset: DatasetExt): SemanticObject {
        const result = new SemanticObject({semanticId: "", semanticType: ""});
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

    public getSemanticObjectAnonymous(): any {
        throw new Error("Can't get the semantic object anonymous: this semantic object is not anonymous.");
    }

    public getSemanticId(): string {
        return this._semanticId;
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

    public hasSemanticPropertiesOtherThanType(): boolean {
        return this._rdfDataset.some((quad: any) => quad.predicate.value !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
    }

    public hasSemanticProperty(property: string): boolean {
        return this._rdfDataset.some((q: any, ds: any) => q.predicate.value === property);
    }

    public isSemanticObjectAnonymous(): boolean {
        return false;
    }

    public isSemanticSameTypeOf(other: Semanticable): boolean {
        return other.isSemanticTypeOf(this._semanticType);
    }

    public isSemanticTypeOf(type: string): boolean {
        return this._semanticType === type;
    }

    public removeSemanticProperty(property: string): void {
        throw new Error("Method not yet implemented.");
    }

    public setSemanticPropertyReference(property: string, value: Semanticable): void {
        this.addSemanticPropertyReference(property, value, true);
    }

    public setSemanticPropertyReferenceId(property: string, value: string): void {
        this.addSemanticPropertyReferenceId(property, value, true);
    }

    public setSemanticPropertyLiteral(property: string, value: string | number | boolean): void {
        this.addSemanticPropertyLiteral(property, value, true);
    }

    public setSemanticPropertyAnonymous(property: string, anonymous: Semanticable): void {
        this.addSemanticPropertyAnonymous(property, anonymous, true);
    }

    public setSemanticId(semanticId: string): void {
        throw new Error("Method not yet implemented.");
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