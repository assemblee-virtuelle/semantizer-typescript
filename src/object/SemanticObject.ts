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
import StoreInterfaceSemanticable from '../store/StoreInterfaceSemanticable';
import SetCommand from '../property/command/SetCommand.js';
import RemoveCommand from '../property/command/RemoveCommand.js';

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

    private _synchronizedResource: string;
    private _store: StoreInterfaceSemanticable;
    private _changelog: Changelogable<string, SemanticableCommand<SemanticPropertyInterface<any>>>;
    
    // resource info
    //private _semanticId: string; 
    private _lastSynchro: string = "datetime";

    public constructor(parameters: {store: StoreInterfaceSemanticable});
    /**
     * Create a new SemanticObject from an other (copy constructor).
     * The semanticId will be overrided by the one passed as a parameter.
     * @param parameters 
     */
    public constructor(parameters: {store: StoreInterfaceSemanticable, other: Semanticable});
    public constructor(parameters: {store: StoreInterfaceSemanticable, other?: Semanticable}) {
        this._store = parameters.store;
        this._synchronizedResource = "local://1";
        this._changelog = new ChangelogProxy(new ChangelogMap());
        this._store.set(this._synchronizedResource, this);
    }

    protected isInternal(): boolean {
        return this._synchronizedResource.startsWith("local");
    }

    protected registerChange(command: SemanticableCommand<SemanticPropertyInterface<any>>): void {
        const property = command.getTarget();
        this.getChangelogInternal().registerChange(property.getName(), command);
    }

    public createProperty<T>(name: string, value: T): SemanticPropertyInterface<T> {
        return new SemanticProperty<T>(name, value);
    }

    public createPropertyUrl(property: SemanticPropertyInterface<Semanticable>): SemanticPropertyInterface<URL> {
        const url = new URL(property.getValue().getSynchronizedResourceUrl());
        return this.createProperty<URL>(property.getName(), url);
    }

    private toPropertyUrlIfNeeded<T>(property: SemanticPropertyInterface<T>): SemanticPropertyInterface<T | URL> {
        return property.isReference()? this.createPropertyUrl(<SemanticPropertyInterface<Semanticable>> property): property;
    }

    public createAddCommand<T>(name: string, value: T): SemanticableCommand<SemanticPropertyInterface<T | URL>> {
        const property = this.toPropertyUrlIfNeeded<T>(this.createProperty<T>(name, value));
        return new AddCommand<typeof property>(property);
    }

    public createSetCommand<T>(name: string, value: T): SemanticableCommand<SemanticPropertyInterface<T | URL>> {
        const property = this.toPropertyUrlIfNeeded<T>(this.createProperty<T>(name, value));
        return new SetCommand<typeof property>(property);
    }

    public createRemoveCommand<T>(name: string, value: T): SemanticableCommand<SemanticPropertyInterface<T | URL>> {
        const property = this.toPropertyUrlIfNeeded<T>(this.createProperty<T>(name, value));
        return new RemoveCommand<typeof property>(property);
    }

    public addSemanticProperty<T>(name: string, value: T): void {
        this.registerChange(this.createAddCommand<T>(name, value));
    }

    public setSemanticProperty<T>(name: string, value: T): void {
        this.registerChange(this.createSetCommand<T>(name, value));
    }

    public removeSemanticProperty<T>(name: string, value: T): void {
        this.registerChange(this.createRemoveCommand<T>(name, value));
    }

    public getChangelogInternal(): Changelogable<string, SemanticableCommand<SemanticPropertyInterface<any>>> {
        return this._changelog;
    }

    public getChangelog(): Changelogable<string, SemanticableCommand<SemanticPropertyInterface<any>>> {
        return this.getChangelogInternal().clone();
    }

    public getStore(): StoreInterfaceSemanticable {
        return this._store;
    }

    public getSemanticPropertyLastChange<T>(name: string): SemanticableCommand<SemanticPropertyInterface<T>> | undefined {
        return this.getChangelogInternal().getLastChange(name);
    }

    public getSemanticPropertyLastChangeTarget<T>(name: string): SemanticPropertyInterface<T> | undefined {
        return this.getSemanticPropertyLastChange<T>(name)?.getTarget();
    }

    public async getSemanticPropertyLastChangeValue<T>(name: string): Promise<T | undefined> {
        const property = this.getSemanticPropertyLastChangeTarget<T>(name);
        return property? this.mayDereferencePropertyValue<T>(property): undefined;
    }

    // TODO: query the store
    public async mayDereferencePropertyValue<T>(property: SemanticPropertyInterface<T>): Promise<T> {
        return property.isReference()? property.getValue(): property.getValue();
    }

    // getSemanticProperty<Semanticable> => dereference the object and return it
    // getSemanticProperty<Semanticable> => URL
    public async getSemanticProperty<T>(name: string): Promise<T | undefined> {
        return await this.getSemanticPropertyLastChangeValue<T>(name);
    }

    public getSynchronizedResourceUrl(): string {
        return this._synchronizedResource;
    }

    // apply changes and write to storage
    public async synchronize(resource?: string, options?: { fetch: Function, methodHint?: "PUT" | "POST" | "PATCH" }): Promise<void> {
        // TODO: prévoir une stratégie qui donne une commande
        // + une chaine de responsabilité par exemple pour stopper la chaine s'il n'y a pas de réseau (offline) ou pour 
        // permettre des stratégie de synchronisation plus économiques en terme de réseau (fusion de +sieurs commandes de syncrho).
        if (resource) {
            // If the resource was never synchronized before
            if (this.isInternal()) {
                const isStored: boolean = false; // check if we aleready have the resource in the store. 
                
                // The resource exists, we want an update
                if (isStored) {
                    // we load the resource and we apply changes before to send an update.
                }

                else {
                    // we try to create the resource
                    
                    // if the resource is already existing, il faut résoudre le conflit
                }
            }

            // We want an update
            else {
                // if the resource does not exist (it was deleted) we add it.
            }
        }

        await this.saveTemplateMethod(resource, options); // can throws
        this._store.set(this.getSynchronizedResourceUrl(), this);
    }

    protected abstract saveTemplateMethod(resource?: string, options?: { fetch: Function, methodHint?: "PUT" | "POST" | "PATCH" }): Promise<string>;

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
