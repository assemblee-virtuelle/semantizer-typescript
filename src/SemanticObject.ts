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
export default class SemanticObject {

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
        return this.getSemanticPropertyAll(property)[0];
    }

    public getSemanticPropertyAll(property: string): any {
        const iteratee = (r: any, q: any) => {
            if (q.predicate.value === property) 
                r.push(q.object.value)
            return r;
        }
        return this._rdfDataset.reduce(iteratee, []);
    }

    public hasSemanticProperty(property: string) {
        return this._rdfDataset.some((q: any, ds: any) => q.predicate.value === property);
    }

    public removeSemanticProperty(property: string): void {
        throw new Error("Method not yet implemented.");
    } 

    public setSemanticProperty(property: string, value: string): void {
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
        this.setSemanticProperty('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', type);
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


    /**
     * Associates the name of a property to its corresponding index in the properties array. 
     * It allows to retrieve a property object by name faster (no need to search).
     * 
     * To get the index of the property you want to retrieve, simply use the "get" method 
     * of this Map like "nameIndex.get(nameOfTheProperty)". Then, access to the requested 
     * property object with "properties[index]".
     */
    //private nameIndex: Map<string, number>;

    /*constructor(semanticId: string | undefined = undefined, semanticType: string | undefined = undefined) {
        this.properties = new Array<SemanticProperty>();
        this.nameIndex = new Map<string, number>();
        if (semanticId) this.setSemanticId(semanticId);
        if (semanticType) this.setSemanticType(semanticType);
    }

    /**
     * Append a new property in the list of properties. It also updates the nameIndex 
     * for a faster access. It should only be used publicly by the registerSemanticProperty 
     * method.
     * 
     * @param name The name of the property to create.
     * @param valueGetter The funtion to get the value of the property.
     * @see The nameIndex property.
     */
    /*protected createProperty(name: string, valueGetter: () => string | number | boolean | Semanticable | string[] | number[] | boolean[] | IterableIterator<Semanticable> | undefined) {
        let elementCount: number = this.properties.push(new SemanticProperty(name, valueGetter));
        let index: number = elementCount - 1;
        this.nameIndex.set(name, index);
    }

    public getSemanticProperties(): IterableIterator<Propertyable> {
        return this.properties.values();
    }

    public getSemanticPropertyValue(name: string): string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined {
        let index: number | undefined = this.nameIndex.get(name);
        return index !== undefined ? this.properties[index].getValue() : undefined;
    }

    public getSemanticId(): string | undefined {
        return "" + this.getSemanticPropertyValue(SemanticObject.ATTRIBUTES.ID);
    }

    public getSemanticType(): string | undefined {
        return "" + this.getSemanticPropertyValue(SemanticObject.ATTRIBUTES.TYPE);
    }

    public isBlankNode(): boolean {
        const semanticId = this.getSemanticId();
        return semanticId === undefined || semanticId === "" || semanticId === "undefined";
    }

    public registerSemanticProperty(name: string, valueGetter: () => string | number | boolean | Semanticable | string[] | number[] | boolean[] | IterableIterator<Semanticable> | undefined): void {
        this.createProperty(name, valueGetter);
    }

    public setSemanticId(id: string): void {
        this.registerSemanticProperty(SemanticObject.ATTRIBUTES.ID, () => id);
    }

    public setSemanticType(type: string): void {
        this.registerSemanticProperty(SemanticObject.ATTRIBUTES.TYPE, () => type);
    }

    public serialize(serializer: Serializer<any>): object {
        return serializer.process(this);
    }
    
}
*/