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
import ISemantizer from './ISemantizer';
import IContext from './IContext';

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

    private _semantizer: ISemantizer;
    private _semanticId: string;
    private _rdfDataset: any;

    /**
     * Create a new SemanticObject.
     * @param parameters 
     */
    public constructor(parameters: {semantizer: ISemantizer, semanticId: string, semanticType?: string});

    /**
     * Create a new SemanticObject from an other (copy constructor).
     * The semanticId will be overrided by the one passed as a parameter.
     * @param parameters 
     */
    public constructor(parameters: {semantizer: ISemantizer, semanticId: string, other: Semanticable});
    public constructor(parameters: {semantizer: ISemantizer, semanticId?: string, semanticType?: string, other?: Semanticable}) {
        this._semantizer = parameters.semantizer;
        this._semanticId = parameters.other? parameters.other.getSemanticId(): parameters.semanticId!;
        this._rdfDataset = parameters.other? parameters.other.toRdfDatasetExt(): rdf.dataset();
        if (parameters.semanticType)
            this.addSemanticPropertyReferenceId('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', parameters.semanticType);
    }

    public getContext(): IContext {
        return this.getSemantizer().getContext();
    }

    public getSemantizer(): ISemantizer {
        return this._semantizer;
    }

    protected addRdfQuad(quad: QuadExt): void {
        this._rdfDataset.add(quad);
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
        this._rdfDataset.addAll(anonymous.toRdfDatasetExt());
    }

    public clone(): SemanticObject {
        return new SemanticObject({ semantizer: this.getSemantizer(), semanticId: this._semanticId, other: this });
    }

    protected createRdfQuad(property: string, value: string): any {
        return rdf.quad(
            rdf.namedNode(this.getSemanticId()),
            rdf.namedNode(this.getSemantizer().expand(property)),
            rdf.namedNode(this.getSemantizer().expand(value))
        )
    }

    public static createFromRdfDataset(semantizer: ISemantizer, dataset: DatasetExt): SemanticObject {
        const result = new SemanticObject({ semantizer: semantizer, semanticId: "", semanticType: "" });
        result.setSemanticPropertyAllFromRdfDataset(dataset);
        return result;
    }

    protected createRdfQuadLiteral(property: string, value: string): any {
        return rdf.quad(
            rdf.namedNode(this.getSemanticId()),
            rdf.namedNode(this.getSemantizer().expand(property)),
            rdf.literal(value)
        )
    }

    protected createRdfQuadBlankNode(property: string, blankNodeQuad: any): any {
        return rdf.quad(
            rdf.namedNode(this.getSemanticId()),
            rdf.namedNode(this.getSemantizer().expand(property)),
            blankNodeQuad
        )
    }

    protected deleteRdfProperty(property: string): void {
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
    public equals(other: Semanticable): boolean {
        let result: boolean = false;

        if (this._semanticId === other.getSemanticId())
            result = this.hasSameProperties(other);
        
        return result;
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
            if (q.predicate.value === this.getSemantizer().expand(property)) 
                r.push(this.getSemantizer().shorten(q.object.value))
            return r;
        }
        return this._rdfDataset.reduce(iteratee, []);
    }

    public getSemanticPropertyAnonymous(property: string): DatasetExt {
        const blankNodeId = this.getSemanticProperty(property);
        return this.getSemanticPropertyAnonymousId(blankNodeId);
    }

    public getSemanticPropertyAnonymousAll(property: string): DatasetExt[] {
        const results: DatasetExt[] = [];
        const blankNodeIds: string[] = this.getSemanticPropertyAll(property);
        blankNodeIds.forEach(blankNodeId => results.push(this.getSemanticPropertyAnonymousId(blankNodeId)));
        return results;
    }

    private getSemanticPropertyAnonymousId(blankNodeId: string): DatasetExt {
        return this._rdfDataset.filter((q: any) => q.subject.value === blankNodeId);
    }

    public getSize(): number {
        return this._rdfDataset.size;
    }

    public hasSameProperties(other: Semanticable): boolean {
        let result: boolean = false;

        if (this.getSize() === other.getSize()) {
            const otherDataset = other.toRdfDatasetExt();
            for (const quad of this._rdfDataset) {
                const filter = ((otherQuad: any) => {
                    const language = quad.object.termType === "Literal"? quad.object.language === otherQuad.object.language: true;
                    return quad.subject.value === otherQuad.subject.value &&
                    quad.predicate.value === otherQuad.predicate.value && 
                    quad.object.termType === otherQuad.object.termType &&
                    quad.object.value === otherQuad.object.value && 
                    language;
                });

                const otherQuads: any = otherDataset.filter(filter);
                
                if (otherQuads.size !== 1) {
                    return false;
                }
            }

            result = true;
        }
        
        return result;
    }

    public hasSemanticProperty(property: string): boolean {
        property = this.getSemantizer().expand(property);
        return this._rdfDataset.some((q: any, ds: any) => q.predicate.value === property);
    }

    public isSemanticObjectAnonymous(): boolean {
        return false;
    }

    public isSemanticSameTypeOf(other: Semanticable): boolean {
        return other.isSemanticTypeOf(this.getSemanticType());
    }

    public isSemanticTypeOf(type: string): boolean {
        return this.getSemantizer().expand(this.getSemanticType()) === this.getSemantizer().expand(type);
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
    public toRdfDatasetExt(): DatasetExt {
        return this._rdfDataset.clone();
    }

}