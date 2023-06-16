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
import Changelogable from './Changelogable.js';
import SemanticPropertyInterface from '../property/SemanticPropertyInterface.js';
import Semanticable from './Semanticable.js';
import SemanticableCommand from './SemanticableCommand.js';
import SemanticProperty from '../property/SemanticProperty.js';
import ChangelogProxy from '../changelog/ChangelogProxy.js';
import ChangelogMap from '../changelog/ChangelogMap.js';
import StoreInterfaceSemanticable from '../store/StoreInterfaceSemanticable';
import SetCommand from '../property/command/SetCommand.js';
import RemoveCommand from '../property/command/RemoveCommand.js';
import Publisher from '../common/Publisher.js';
import Subscriber from '../common/Subscriber.js';
import Synchronizable from './Synchronizable.js';
import Browsable from './Browsable.js';
import ChangeKeeper from '../changelog/ChangeKeeper.js';

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

type SemanticPropertyType<T> = SemanticPropertyInterface<T> & Subscriber;

export default abstract class SemanticObject implements Semanticable, Publisher, Browsable, Changelogable, Synchronizable {
    
    private _synchronizedResource: string;
    private _store: StoreInterfaceSemanticable;
    private _changelog: ChangeKeeper<string, SemanticableCommand<SemanticPropertyType<any>>>;
    private _subscribers: Set<Subscriber>;
    
    // resource info
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
        this._changelog = new ChangelogProxy(new ChangelogMap());
        this._synchronizedResource = this.getStore().add(this);
        this._subscribers = new Set();
    }

    public getSubscribers(): Set<Subscriber> {
        return this._subscribers;
    }

    public subscribe(subscriber: Subscriber): void {
        this.getSubscribers().add(subscriber);
    }
    
    public unsubscribe(subscriber: Subscriber): void {
        this.getSubscribers().delete(subscriber);
    }
    
    public notifySubscribers(): void {
        this.getSubscribers().forEach(subscriber => subscriber.update());
    }

    protected isInternal(): boolean {
        return this.getSynchronizedResourceUrl().startsWith("local");
    }

    public isStored(): boolean {
        return this.getStore().has(this.getSynchronizedResourceUrl());
    }

    protected registerChange(command: SemanticableCommand<SemanticPropertyType<any>>): void {
        const property = command.getTarget();
        this.getChangelogInternal().registerChange(property.getName(), command);
    }

    public createProperty<T>(name: string, value: T): SemanticPropertyType<T> {
        return new SemanticProperty<T>(name, value);
    }

    public createPropertyUrl(property: SemanticPropertyType<Semanticable>): SemanticPropertyType<URL> {
        const url = new URL(property.getValue().getSynchronizedResourceUrl());
        return this.createProperty<URL>(property.getName(), url);
    }

    public bindToPropertyUrl(property: SemanticPropertyType<URL>): SemanticPropertyType<URL> {
        this.subscribe(property);
        return property;
    }

    private toPropertyUrlIfNeeded<T>(property: SemanticPropertyType<T>): SemanticPropertyType<T | URL> {
        const isSemanticable: boolean = property.getValue() instanceof Object && 'addSemanticProperty' in <Object> property.getValue();
        return isSemanticable? this.bindToPropertyUrl(this.createPropertyUrl(<SemanticPropertyType<Semanticable>> property)): property;
    }

    public createAddCommand<T>(name: string, value: T): SemanticableCommand<SemanticPropertyType<T | URL>> {
        const property = this.toPropertyUrlIfNeeded<T>(this.createProperty<T>(name, value));
        return new AddCommand<typeof property>(property);
    }

    public createSetCommand<T>(name: string, value: T): SemanticableCommand<SemanticPropertyType<T | URL>> {
        const property = this.toPropertyUrlIfNeeded<T>(this.createProperty<T>(name, value));
        return new SetCommand<typeof property>(property);
    }

    public createRemoveCommand<T>(name: string, value: T): SemanticableCommand<SemanticPropertyType<T | URL>> {
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

    public getChangelogInternal(): ChangeKeeper<string, SemanticableCommand<SemanticPropertyType<any>>> {
        return this._changelog;
    }

    public getChangelog(): ChangeKeeper<string, SemanticableCommand<SemanticPropertyType<any>>> {
        return this.getChangelogInternal().clone();
    }

    public getStore(): StoreInterfaceSemanticable {
        return this._store;
    }

    public getFromStore(name: string): Promise<Semanticable | undefined> {
        return this.getStore().get(name);
    }

    public store(name: string, value: Semanticable): void {
        this.getStore().set(name, value);
    }

    public getSemanticPropertyLastChange<T>(name: string): SemanticableCommand<SemanticPropertyType<T>> | undefined {
        return this.getChangelogInternal().getLastChange(name);
    }

    public getSemanticPropertyLastChangeTarget<T>(name: string): SemanticPropertyType<T> | undefined {
        return this.getSemanticPropertyLastChange<T>(name)?.getTarget();
    }

    public async getSemanticPropertyLastChangeValue<T>(name: string): Promise<T | Semanticable | undefined> {
        const property = this.getSemanticPropertyLastChangeTarget<T>(name);
        return property? this.mayDereferencePropertyValue<T>(property): undefined;
    }

    public async mayDereferencePropertyValue<T>(property: SemanticPropertyType<T>): Promise<T | Semanticable | undefined> {
        const value = property.getValue();
        return property.isReference()? this.getFromStore((<URL> value).toString()): value;
    }

    public async getSemanticProperty<T>(name: string): Promise<T | Semanticable | undefined> {
        return await this.getSemanticPropertyLastChangeValue<T>(name);
    }

    public getSynchronizedResourceUrl(): string {
        return this._synchronizedResource;
    }

    private setSynchronizedResourceUrl(url: string): void {
        if (url !== this.getSynchronizedResourceUrl()) {
            const oldUrl = this.getSynchronizedResourceUrl();
            this._synchronizedResource = url;
            this.store(url, this);
            this.notifySubscribers();
            this.removeFromStore(oldUrl);
        }
    }

    public removeFromStore(name: string): boolean {
        return this.getStore().unset(name);
    }

    private handleSynchronizeSuccess(result: string) {
        this.setSynchronizedResourceUrl(result);
    }

    private handleSynchronizeFail(error: string) {
        
    }

    public async synchronize(resource?: string, options?: { fetch: Function, methodHint?: "PUT" | "POST" | "PATCH" }): Promise<void> {
        await this.handleSynchronize(resource, options)
            .then(result => this.handleSynchronizeSuccess(result))
            .catch(error => this.handleSynchronizeFail(error));
    }

    protected abstract handleSynchronize(resource?: string, options?: { fetch: Function, methodHint?: "PUT" | "POST" | "PATCH" }): Promise<string>;

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
