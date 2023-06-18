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
import SemanticProperty from './SemanticProperty.js';
import Handler from './Handler.js';
import RequestFactory from './RequestFactory.js';
import HandlerRequest from './HandlerRequest.js';

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

type Request = HandlerRequest<any, any, Semanticable>;

export default abstract class SemanticObject<AddHandler extends Handler<void>, GetHandler extends Handler<any>, SetHandler extends Handler<void>, RemoveHandler extends Handler<void>> implements Semanticable {

    private _requestFactory: RequestFactory<Semanticable>;
    private _addSemanticPropertyHandlerChain: AddHandler;
    private _getSemanticPropertyHandlerChain: GetHandler;
    private _setSemanticPropertyHandlerChain: SetHandler;
    private _removeSemanticPropertyHandlerChain: RemoveHandler;
    
    public constructor(other?: SemanticObject<AddHandler, GetHandler, SetHandler, RemoveHandler>) {
        this._requestFactory = other? other.getDefaultRequestFactory(): this.getDefaultRequestFactory();
        this._addSemanticPropertyHandlerChain = other? other._addSemanticPropertyHandlerChain: this.getDefaultHandlerChainToAddSemanticProperty();
        this._getSemanticPropertyHandlerChain = other? other._getSemanticPropertyHandlerChain: this.getDefaultHandlerChainToGetSemanticProperty();
        this._setSemanticPropertyHandlerChain = other? other._setSemanticPropertyHandlerChain: this.getDefaultHandlerChainToSetSemanticProperty();
        this._removeSemanticPropertyHandlerChain = other? other._removeSemanticPropertyHandlerChain: this.getDefaultHandlerChainToRemoveSemanticProperty();
    }

    protected abstract getDefaultRequestFactory(): RequestFactory<Semanticable>;
    protected abstract getDefaultHandlerChainToAddSemanticProperty(): AddHandler;
    protected abstract getDefaultHandlerChainToGetSemanticProperty(): GetHandler;
    protected abstract getDefaultHandlerChainToSetSemanticProperty(): SetHandler;
    protected abstract getDefaultHandlerChainToRemoveSemanticProperty(): RemoveHandler;

    public getRequestFactory(): RequestFactory<Semanticable> {
        return this._requestFactory;
    }

    public createAddRequest<T>(name: string, value: T): Request {
        return this.getRequestFactory().createRequestToAddSemanticProperty<T>(name, value);
    }

    public createGetRequest(name: string): Request {
        return this.getRequestFactory().createRequestToGetSemanticProperty(name);
    }

    public createGetAllRequest(name: string): Request {
        return this.getRequestFactory().createRequestToGetSemanticPropertyAll(name);
    }

    public createSetRequest<T>(name: string, newValue: T, oldValue: T): Request {
        return this.getRequestFactory().createRequestToSetSemanticProperty<T>(name, newValue, oldValue);
    }

    public createRemoveRequest<T>(name: string, value: T): Request {
        return this.getRequestFactory().createRequestToRemoveSemanticProperty<T>(name, value);
    }

    public addSemanticProperty<T>(name: string, value: T): void {
        this._addSemanticPropertyHandlerChain.handle(this.createAddRequest<T>(name, value));
    }

    public getSemanticProperty<T>(name: string): SemanticProperty<T> | undefined {
        throw new Error("Method not implemented.");
    }

    public getSemanticPropertyAll<T>(name: string): SemanticProperty<T>[] {
        throw new Error("Method not implemented.");
    }
    
    public async getSemanticPropertyValue<T>(name: string): Promise<T> {
        return this._getSemanticPropertyHandlerChain.handle(this.createGetRequest(name));
    }

    public async getSemanticPropertyValueAll<T>(name: string): Promise<Array<T | Semanticable>> {
        return this._getSemanticPropertyHandlerChain.handle(this.createGetAllRequest(name));
    }

    public setSemanticProperty<T>(name: string, newValue: T, oldValue: T): void {
        this._setSemanticPropertyHandlerChain.handle(this.createSetRequest<T>(name, newValue, oldValue));
    }

    public removeSemanticProperty<T>(name: string, value: T): void {
        this._removeSemanticPropertyHandlerChain.handle(this.createRemoveRequest(name, value));
    }

}
