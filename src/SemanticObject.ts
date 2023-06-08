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

import AddCommand from './AddCommand';
import Changelog from './Changelog';
import Changelogable from './Changelogable';
import SemanticPropertyInterface from './SemanticPropertyInterface';
import Semanticable from './Semanticable';
import { SolidDataset, createSolidDataset, getThing, addUrl } from '@inrupt/solid-client';
import SemanticableCommand from './SemanticableCommand';

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

    //private _semanticId: string; // delete?
    //private _name: string;
    private _semanticType: string = "";
    
    private _localDataset: any;
    private _distantDataset: any;

    private _changelog: Changelogable<string, SemanticableCommand<SemanticPropertyInterface<any>>>;

    private _dataset: SolidDataset = createSolidDataset(); // dataset distant
    private _commands: any[] = [];

    // resource info
    private _lastSynchro: string = "datetime";

    /**
     * Create a new SemanticObject.
     * @param parameters 
     */
    public constructor(parameters: {semanticId: string, semanticType: string});

    /**
     * Create a new SemanticObject from an other (copy constructor).
     * The semanticId will be overrided by the one passed as a parameter.
     * @param parameters 
     */
    public constructor(parameters: {semanticId: string, other: Semanticable});
    public constructor(parameters: {semanticId?: string, semanticType?: string, other?: Semanticable}) {
        //this._semanticId = parameters.other? parameters.other.getSemanticId(): parameters.semanticId!;
        //this._dataset = parameters.other? parameters.other.toSolidDataset(): createSolidDataset();
        //this._semanticType = parameters.other? parameters.other.getSemanticType(): parameters.semanticType!;
        this._changelog = new Changelog<string, SemanticableCommand<SemanticPropertyInterface<any>>>();
    }

    /*protected getSolidThing(): any {
        return getThing(this._dataset, this._semanticId);
    }*/

    public addSemanticProperty<T>(property: SemanticPropertyInterface<T>): void {
        const command = new AddCommand<SemanticPropertyInterface<T>>(property);
        this._changelog.registerChange(command);
    }

    public setSemanticProperty<T>(property: SemanticPropertyInterface<T>): void {

    }

    public removeSemanticProperty<T>(property: SemanticPropertyInterface<T>): void {

    }

    // Find the latest change
    public getSemanticProperty<T>(name: string): T | undefined {
        const change: SemanticableCommand<SemanticPropertyInterface<T>> | undefined = this._changelog.getLastChange(name);

        if (change) {
            const t: SemanticPropertyInterface<T> = change.getTarget();
            return t.getValue();
        }

        return undefined;
    }

    // applu changes and write to storage
    public saveToSemanticSource(url: string, forceOverride: boolean): void {
        // const dataset = this._dataset.clone(); create a new dataset
    }

    /*

    public registerChange(command: AddReference): void {
        const thing = this.getSolidThing();
        const property = command.getProperty();
        const value = command.getValue();
        this._dataset = addUrl(thing, property, value);
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
        this._dataset.addAll(anonymous.toRdfDatasetExt());
    }

    public clone(): SemanticObject {
        return new SemanticObject({ semanticId: this._semanticId, other: this });
    }

    public static createFromRdfDataset(dataset: SolidDataset): SemanticObject {
        const result = new SemanticObject({semanticId: "", semanticType: ""});
        result.setSemanticPropertyAllFromRdfDataset(dataset);
        return result;
    }

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

    public getSemanticPropertyAll(property: string): any[] {
        const iteratee = (r: any, q: any) => {
            if (q.predicate.value === property) 
                r.push(q.object.value)
            return r;
        }
        return this._dataset.reduce(iteratee, []);
    }

    public getSemanticPropertyAnonymous(property: string): SolidDataset {
        const blankNodeId = this.getSemanticProperty(property);
        return this.getSemanticPropertyAnonymousId(blankNodeId);
    }

    public getSemanticPropertyAnonymousAll(property: string): SolidDataset[] {
        const results: SolidDataset[] = [];
        const blankNodeIds: string[] = this.getSemanticPropertyAll(property);
        blankNodeIds.forEach(blankNodeId => results.push(this.getSemanticPropertyAnonymousId(blankNodeId)));
        return results;
    }

    private getSemanticPropertyAnonymousId(blankNodeId: string): SolidDataset {
        return this._dataset.filter((q: any) => q.subject.value === blankNodeId);
    }

    public getSize(): number {
        return this._dataset.size;
    }

    public hasSameProperties(other: Semanticable): boolean {
        let result: boolean = false;

        if (this.getSize() === other.getSize()) {
            const otherDataset = other.toRdfDatasetExt();
            for (const quad of this._dataset) {
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
        return this._dataset.some((q: any, ds: any) => q.predicate.value === property);
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

    public setSemanticPropertyAllFromRdfDataset(dataset: SolidDataset): void {
        this._dataset = dataset.clone();
        const datasetArray: QuadExt[] = Array.from(this._dataset);
        if (datasetArray.length > 0) {
            const firstQuad: QuadExt = datasetArray[0];
            // @ts-ignore
            this._semanticId = firstQuad.subject.value;
        }
    }

    public toSolidDataset(): SolidDataset {
        return this._dataset.clone();
    }*/

}