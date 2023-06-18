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
import HandlerMap from "./HandlerMap.js";

type Property = SemanticProperty<any>;

export default class SemanticObjectMap extends SemanticObjectWithDataset<Array<Property>, Handler, Handler, Handler, Handler> {

    constructor(other?: SemanticObjectMap) {
        super(new Array<Property>(), other);
    }

    protected getDefaultRequestFactory(): RequestFactory<Semanticable> {
        return new RequestFactoryDefault(this);
    }

    protected createSemanticProperty<Value>(name: string, value: Value): SemanticProperty<Value> {
        return new SemanticPropertyBase(name, value);
    }

    protected getDefaultHandlerChainToAddSemanticProperty(): Handler {
        // return new Accept(['ADD'], new HandlerStore());
        const store = new HandlerStore();
        const dataset = new HandlerMap(this, store);
        return new HandlerFilter(new HandlerFilterStrategyByName(['ADD'], 'ACCEPT'), dataset);
    }

    protected getDefaultHandlerChainToGetSemanticProperty(): Handler {
        const strategy = new HandlerFilterStrategyByName(['GET', 'GET_ALL'], 'ACCEPT');
        return new HandlerFilter(strategy, new HandlerMap(this));
    }

    protected getDefaultHandlerChainToSetSemanticProperty(): Handler {
        const strategy = new HandlerFilterStrategyByName(['SET'], 'ACCEPT');
        return new HandlerFilter(strategy, new HandlerMap(this));
    }

    protected getDefaultHandlerChainToRemoveSemanticProperty(): Handler {
        const strategy = new HandlerFilterStrategyByName(['REMOVE'], 'ACCEPT');
        return new HandlerFilter(strategy, new HandlerMap(this));
    }

    private findIndex<T>(name: string, value: T): number {
        return this.getDataset().findIndex((p: Property) => p.getName() === name && p.getValue() === value);
    }

    public add<T>(name: string, value: T): void {
        this.getDataset().push(this.createSemanticProperty(name, value));
    }

    public get<T>(name: string): Property | undefined {
        return this.getDataset().find((p: Property) => p.getName() === name);
    }

    public getAll(name: string): Property[] {
        return this.getDataset().filter((p: Property) => p.getName() === name);
    }

    public set<T>(name: string, newValue: T, oldValue: T): void {
        const index = this.findIndex(name, oldValue);
        if (-1 !== index)
            this.getDataset().splice(index, 1, this.createSemanticProperty<T>(name, newValue));
    }

    public unset<T>(name: string, value: T): void {
        const index = this.findIndex(name, value);
        if (-1 !== index)
            this.getDataset().splice(index, 1);
    }

}