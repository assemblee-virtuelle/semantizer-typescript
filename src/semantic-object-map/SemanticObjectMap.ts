import SemanticObjectWithDataset from "../core/SemanticObjectWithDataset.js";
import Handler from "../core/Handler.js";
import SemanticProperty from "../core/SemanticProperty.js";
import HandlerFilter from "../handlers/filter/HandlerFilter.js";
import HandlerFilterStrategyByName from "../handlers/filter/HandlerFilterStrategyByName.js";
import HandlerStore from "../handlers/store/HandlerStore.js";
import SemanticPropertyBase from "../base/SemanticPropertyBase.js";
import RequestFactory from "../core/RequestFactory.js";
import Semanticable from "../core/Semanticable.js";
import RequestFactoryDefault from "../core/RequestFactoryDefault.js";
import HandlerMapAdd from "./HandlerMapAdd.js";
import HandlerMapGet from "./HandlerMapGet.js";

type Property = SemanticProperty<any>;

export default class SemanticObjectMap extends SemanticObjectWithDataset<Array<Property>, Handler<void>, Handler<string | undefined>, Handler<void>, Handler<void>> {
    
    constructor(other?: SemanticObjectMap) {
        super(new Array<Property>(), other);
    }

    protected getDefaultRequestFactory(): RequestFactory<Semanticable> {
        return new RequestFactoryDefault(this);
    }

    protected createSemanticProperty<Value>(name: string, value: Value): SemanticProperty<Value> {
        return new SemanticPropertyBase(name, value);
    }

    protected getDefaultHandlerChainToAddSemanticProperty(): Handler<void> {
        // return new Accept(['ADD'], new HandlerStore());
        const store = new HandlerStore();
        const dataset = new HandlerMapAdd(this, store);
        return new HandlerFilter<void>(new HandlerFilterStrategyByName(['ADD'], 'ACCEPT'), dataset);
    }

    protected getDefaultHandlerChainToGetSemanticProperty(): Handler<string | undefined> {
        const strategy = new HandlerFilterStrategyByName(['GET', 'GET_ALL'], 'ACCEPT');
        return new HandlerFilter<string>(strategy, new HandlerMapGet(this));
    }

    protected getDefaultHandlerChainToSetSemanticProperty(): Handler<void> {
        return new HandlerFilter<void>(new HandlerFilterStrategyByName(['SET'], 'ACCEPT'));
    }

    protected getDefaultHandlerChainToRemoveSemanticProperty(): Handler<void> {
        return new HandlerFilter<void>(new HandlerFilterStrategyByName(['RMV'], 'ACCEPT'));
    }

    private findIndex<T>(name: string, value: T): number {
        return this.getDataset().findIndex((p: Property) => p.getName() === name && p.getValue() === value);
    }

    public add<T>(name: string, value: T): void {
        this.getDataset().push(this.createSemanticProperty(name, value));
    }

    public get(name: string): any {
        return this.getDataset().find((p: Property) => p.getName() === name);
    }

    public getAll(name: string): Property[] {
        return this.getDataset().filter((p: Property) => p.getName() === name);
    }

    public set<T>(name: string, oldValue: T, newValue: T): void {
        const index = this.findIndex(name, oldValue);
        if (-1 !== index)
            this.getDataset().splice(index, 1, this.createSemanticProperty(name, newValue));
    }

    public unset<T>(name: string, value: T): void {
        const index = this.findIndex(name, value);
        if (-1 !== index)
            this.getDataset().splice(index, 1);
    }

}