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
import SemanticPropertyInterface from './SemanticPropertyInterface.js';
import Handler from './Handler.js';
import Command from './Command.js';
import CommandFactory from './CommandFactory.js';

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
export default abstract class SemanticObject<Result, AddHandler extends Handler<void>, GetHandler extends Handler<any>, SetHandler extends Handler<void>, RemoveHandler extends Handler<void>> implements Semanticable {

    private _commandFactory: CommandFactory<Result>;
    private _addSemanticPropertyHandlerChain: AddHandler;
    private _getSemanticPropertyHandlerChain: GetHandler;
    private _setSemanticPropertyHandlerChain: SetHandler;
    private _removeSemanticPropertyHandlerChain: RemoveHandler;
    
    public constructor(other?: SemanticObject<Result, AddHandler, GetHandler, SetHandler, RemoveHandler>) {
        this._commandFactory = other? other.getDefaultCommandFactory(): this.getDefaultCommandFactory();
        this._addSemanticPropertyHandlerChain = other? other._addSemanticPropertyHandlerChain: this.getDefaultHandlerChainToAddSemanticProperty();
        this._getSemanticPropertyHandlerChain = other? other._getSemanticPropertyHandlerChain: this.getDefaultHandlerChainToGetSemanticProperty();
        this._setSemanticPropertyHandlerChain = other? other._setSemanticPropertyHandlerChain: this.getDefaultHandlerChainToSetSemanticProperty();
        this._removeSemanticPropertyHandlerChain = other? other._removeSemanticPropertyHandlerChain: this.getDefaultHandlerChainToRemoveSemanticProperty();
    }

    protected abstract getDefaultCommandFactory(): CommandFactory<Result>;
    protected abstract getDefaultHandlerChainToAddSemanticProperty(): AddHandler;
    protected abstract getDefaultHandlerChainToGetSemanticProperty(): GetHandler;
    protected abstract getDefaultHandlerChainToSetSemanticProperty(): SetHandler;
    protected abstract getDefaultHandlerChainToRemoveSemanticProperty(): RemoveHandler;

    public getCommandFactory(): CommandFactory<Result> {
        return this._commandFactory;
    }

    public createAddCommand<T>(name: string, value: T): Command<void> {
        return this.getCommandFactory().createCommandToAddSemanticProperty<T>(name, value);
    }

    public createGetCommand(name: string): Command<Result> {
        return this.getCommandFactory().createCommandToGetSemanticProperty(name);
    }

    public createSetCommand<T>(name: string, value: T): Command<void> {
        return this.getCommandFactory().createCommandToSetSemanticProperty<T>(name, value);
    }

    public createRemoveCommand<T>(name: string, value: T): Command<void> {
        return this.getCommandFactory().createCommandToRemoveSemanticProperty<T>(name, value);
    }

    public addSemanticProperty<T>(name: string, value: T): void {
        this._addSemanticPropertyHandlerChain.handle(this.createAddCommand<T>(name, value));
    }

    public getSemanticProperty<T>(name: string): SemanticPropertyInterface<T> | undefined {
        throw new Error("Method not implemented.");
    }
    
    public async getSemanticPropertyValue<T>(name: string): Promise<T> {
        return this._getSemanticPropertyHandlerChain.handle(this.createGetCommand(name));
    }

    public setSemanticProperty<T>(name: string, value: T): void {
        this._setSemanticPropertyHandlerChain.handle(this.createSetCommand<T>(name, value));
    }

    public removeSemanticProperty<T>(name: string, value: T): void {
        this._removeSemanticPropertyHandlerChain.handle(this.createRemoveCommand(name, value));
    }

}
