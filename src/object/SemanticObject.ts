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

import AddCommand from '../property/command/AddCommand.js';
import Changelogable from '../changelog/Changelogable.js';
import SemanticPropertyInterface from '../property/SemanticPropertyInterface.js';
import Semanticable from './Semanticable.js';
import { SolidDataset, createSolidDataset, getThing, addUrl, Url } from '@inrupt/solid-client';
import SemanticableCommand from './SemanticableCommand.js';
import SemanticProperty from '../property/SemanticProperty.js';
import ChangelogProxy from '../changelog/ChangelogProxy.js';
import ChangelogMap from '../changelog/ChangelogMap.js';
import StoreInterface from '../store/StoreInterface.js';

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
export default abstract class SemanticObject implements Semanticable {

    private _store: StoreInterface;
    private _changelog: Changelogable<string, SemanticableCommand<SemanticPropertyInterface<any>>>;
    
    // resource info
    private _semanticId: string; 
    private _lastSynchro: string = "datetime";

    public constructor(parameters: {store: StoreInterface});
    /**
     * Create a new SemanticObject from an other (copy constructor).
     * The semanticId will be overrided by the one passed as a parameter.
     * @param parameters 
     */
    public constructor(parameters: {store: StoreInterface, other: Semanticable});
    public constructor(parameters: {store: StoreInterface, other?: Semanticable}) {
        //this._semanticId = parameters?.semanticId? parameters.semanticId : "local://uuid"; 
        this._semanticId = "local://uuid";
        this._store = parameters.store;
        this._changelog = new ChangelogProxy(new ChangelogMap());
        this._store.set(this);
    }

    // TODO: refactor to addSemanticProperty<T>(name: string, value: T): void
    public addSemanticProperty<T>(name: string, value: T): void {
        let command;

        const property: SemanticPropertyInterface<T> = new SemanticProperty<T>(name, value);

        if (property.isReference()) {
            const semanticObject: Semanticable = <Semanticable> property.getValue();
            const semanticId: string = semanticObject.getSemanticId();
            const reference = new SemanticProperty<URL>(property.getName(), new URL(semanticId));
            command = new AddCommand<SemanticPropertyInterface<URL>>(reference);
        }

        else command = new AddCommand<SemanticPropertyInterface<T>>(property);

        this._changelog.registerChange(property.getName(), command);
    }

    public setSemanticProperty<T>(name: string, value: T): void {

    }

    public removeSemanticProperty<T>(name: string, value: T): void {

    }

    public getChangelog(): Changelogable<string, SemanticableCommand<SemanticPropertyInterface<any>>> {
        return this._changelog.clone();
    }

    public getStore(): StoreInterface {
        return this._store;
    }

    public getSemanticId(): string {
        return this._semanticId;
    }

    // Find the latest change
    public async getSemanticProperty<T>(name: string): Promise<T | undefined> {
        const change: SemanticableCommand<SemanticPropertyInterface<T>> | undefined = this._changelog.getLastChange(name);
        let value: T | undefined = undefined;

        if (change) {
            const property: SemanticPropertyInterface<T> = change.getTarget();

            if (property.isReference()) {
                //value = await store.get...
                // TODO : implement the store
            }

            else value = property.getValue();
        }

        return value;
    }

    // apply changes and write to storage
    public async save(url?: string, methodHint?: "PUT" | "POST" | "PATCH"): Promise<void> {
        this._semanticId = await this.saveTemplateMethod(url, methodHint);
        this._store.set(this);
    }

    protected abstract saveTemplateMethod(url?: string, methodHint?: "PUT" | "POST" | "PATCH"): Promise<string>;

    /*

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

    public getSemanticType(){
        return this.getSemanticProperty('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
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
