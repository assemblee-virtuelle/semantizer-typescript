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

import Semanticable from './Semanticable.js';
import RequestFactory from './RequestFactory.js';
import Request from './Request.js';

type SemanticRequest = Request<any, any, any, Semanticable>;

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

    private _requestFactory: RequestFactory<Semanticable>;
    
    public constructor(other?: SemanticObject) {
        this._requestFactory = other? other.getDefaultRequestFactory(): this.getDefaultRequestFactory();
    }

    protected abstract getDefaultRequestFactory(): RequestFactory<Semanticable>;

    protected abstract handle<T>(request: SemanticRequest): T;
    protected abstract handle<T>(request: SemanticRequest): Promise<T>;

    public getRequestFactory(): RequestFactory<Semanticable> {
        return this._requestFactory;
    }

    public createAddRequest<T>(name: string, value: T): SemanticRequest {
        return this.getRequestFactory().createRequestToAddSemanticProperty<T>(name, value);
    }

    public createGetRequest(name: string): SemanticRequest {
        return this.getRequestFactory().createRequestToGetSemanticProperty(name);
    }

    public createGetAllRequest(name: string): SemanticRequest {
        return this.getRequestFactory().createRequestToGetSemanticPropertyAll(name);
    }

    public createSetRequest<T>(name: string, newValue: T, oldValue: T): SemanticRequest {
        return this.getRequestFactory().createRequestToSetSemanticProperty<T>(name, newValue, oldValue);
    }

    public createRemoveRequest<T>(name: string, value: T): SemanticRequest {
        return this.getRequestFactory().createRequestToRemoveSemanticProperty<T>(name, value);
    }

    public addSemanticProperty<T>(name: string, value: T): T;
    public addSemanticProperty<T>(name: string, value: T): Promise<T>;
    public addSemanticProperty<T>(name: string, value: T): T {
        return this.handle<T>(this.createAddRequest<T>(name, value));
    }

    public getSemanticProperty<T>(name: string): T;
    public async getSemanticProperty<T>(name: string): Promise<T> {
        throw new Error("Method not implemented.");
    }

    public getSemanticPropertyAll<T extends Array<T>>(name: string): T;
    public async getSemanticPropertyAll<T extends Array<T>>(name: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    
    public getSemanticPropertyValue<T>(name: string): T | Semanticable | undefined;
    public getSemanticPropertyValue<T>(name: string): Promise<T | Semanticable | undefined>;
    public getSemanticPropertyValue<T>(name: string): T | Semanticable | undefined {
        return this.handle(this.createGetRequest(name));
    }

    public getSemanticPropertyValueAll<T extends Array<T>>(name: string): T;
    public getSemanticPropertyValueAll<T extends Array<T>>(name: string): Promise<T>;
    public getSemanticPropertyValueAll<T extends Array<T>>(name: string): T {
        return this.handle<T>(this.createGetAllRequest(name));
    }

    public setSemanticProperty<T>(name: string, newValue: T, oldValue: T): T;
    public setSemanticProperty<T>(name: string, newValue: T, oldValue: T): Promise<T>;
    public setSemanticProperty<T>(name: string, newValue: T, oldValue: T): T {
        return this.handle<T>(this.createSetRequest<T>(name, newValue, oldValue));
    }

    public removeSemanticProperty<T>(name: string, value: T): T;
    public async removeSemanticProperty<T>(name: string, value: T): Promise<T> {
        return this.handle<T>(this.createRemoveRequest(name, value));
    }

}
