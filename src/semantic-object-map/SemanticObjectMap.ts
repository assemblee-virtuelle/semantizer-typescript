import CommandFactory from "../core/CommandFactory.js";
import CommandFactoryMap from "./CommandFactoryMap.js";
import SemanticObjectWithDataset from "../core/SemanticObjectWithDataset.js";
import HandlerBase from "../core/HandlerBase.js";
import Command from "../core/Command.js";
import Handler from "../core/Handler.js";
import SemanticProperty from "../core/SemanticProperty.js";

type Property = SemanticProperty<any>;

export default class SemanticObjectMap extends SemanticObjectWithDataset<Array<Property>, Property | undefined, Handler<void>, Handler<string>, Handler<void>, Handler<void>> {
    
    constructor(other?: SemanticObjectMap) {
        super(new Array<Property>(), other);
    }

    protected getDefaultCommandFactory(): CommandFactoryMap {
        return new CommandFactoryMap(this);
    }

    protected getDefaultHandlerChainToAddSemanticProperty(): Handler<void> {
        const executor = (command: Command<any>) => command.getName() === 'ADD'? command.execute(): undefined;
        return new HandlerBase(executor);
    }

    protected getDefaultHandlerChainToGetSemanticProperty(): Handler<string> {
        const executor = (command: Command<any>) => ['GET', 'GET_ALL'].includes(command.getName()) ? command.execute(): undefined;
        return new HandlerBase(executor);
    }

    protected getDefaultHandlerChainToSetSemanticProperty(): Handler<void> {
        const executor = (command: Command<any>) => command.getName() === 'SET'? command.execute(): undefined;
        return new HandlerBase(executor);
    }

    protected getDefaultHandlerChainToRemoveSemanticProperty(): Handler<void> {
        const executor = (command: Command<any>) => command.getName() === 'RMV'? command.execute(): undefined;
        return new HandlerBase(executor);
    }

    private findIndex<T>(name: string, value: T): number {
        return this.getDataset().findIndex((p: Property) => p.getName() === name && p.getValue() === value);
    }

    public add(property: Property): void {
        this.getDataset().push(property);
    }

    public get(name: string): Property | undefined {
        return this.getDataset().find((p: Property) => p.getName() === name);
    }

    public getAll(name: string): Property[] {
        return this.getDataset().filter((p: Property) => p.getName() === name);
    }

    public set<T>(name: string, oldValue: T, newValue: T): void {
        const index = this.findIndex(name, oldValue);
        if (-1 !== index)
            this.getDataset().splice(index, 1, this.getDefaultCommandFactory().createSemanticProperty(name, newValue));
    }

    public unset<T>(name: string, value: T): void {
        const index = this.findIndex(name, value);
        if (-1 !== index)
            this.getDataset().splice(index, 1);
    }

}