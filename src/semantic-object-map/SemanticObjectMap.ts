import CommandFactoryMap from "./CommandFactoryMap.js";
import SemanticObjectWithDataset from "../core/SemanticObjectWithDataset.js";
import Handler from "../core/Handler.js";
import SemanticProperty from "../core/SemanticProperty.js";
import HandlerFilter from "../handlers/filter/HandlerFilter.js";
import HandlerFilterStrategyByName from "../handlers/filter/HandlerFilterStrategyByName.js";

type Property = SemanticProperty<any>;

export default class SemanticObjectMap extends SemanticObjectWithDataset<Array<Property>, Property | undefined, Handler<void>, Handler<string>, Handler<void>, Handler<void>> {
    
    constructor(other?: SemanticObjectMap) {
        super(new Array<Property>(), other);
    }

    protected getDefaultCommandFactory(): CommandFactoryMap {
        return new CommandFactoryMap(this);
    }

    protected getDefaultHandlerChainToAddSemanticProperty(): Handler<void> {
        return new HandlerFilter<void>(new HandlerFilterStrategyByName<void>(['ADD'], 'ACCEPT_AND_CONTINUE'));
    }

    protected getDefaultHandlerChainToGetSemanticProperty(): Handler<string> {
        const strategy = new HandlerFilterStrategyByName<string>(['GET', 'GET_ALL'], 'ACCEPT_AND_CONTINUE');
        return new HandlerFilter<string>(strategy);
    }

    protected getDefaultHandlerChainToSetSemanticProperty(): Handler<void> {
        return new HandlerFilter<void>(new HandlerFilterStrategyByName<void>(['SET'], 'ACCEPT_AND_CONTINUE'));
    }

    protected getDefaultHandlerChainToRemoveSemanticProperty(): Handler<void> {
        return new HandlerFilter<void>(new HandlerFilterStrategyByName<void>(['RMV'], 'ACCEPT_AND_CONTINUE'));
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