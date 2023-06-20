import SemanticObjectWithDataset from "../core/SemanticObjectWithDataset.js";
import SemanticProperty from "../core/SemanticProperty.js";
import SemanticPropertyBase from "../base/SemanticPropertyBase.js";
import RequestFactory from "../core/RequestFactory.js";
import Semanticable from "../core/Semanticable.js";
import RequestFactoryDefault from "../core/RequestFactoryDefault.js";
import HandlerMap from "./HandlerMap.js";
import { SemanticObjectRequest } from "../core/SemanticObjectRequest.js";

type Property = SemanticProperty<any>;
type Request = SemanticObjectRequest<any, void, void, void>;

export default class SemanticObjectMap extends SemanticObjectWithDataset<Array<Property>, void, void, void> {

    constructor(other?: SemanticObjectMap) {
        super(new Array<Property>(), other);
    }

    protected getDefaultRequestFactory(): RequestFactory<Semanticable<void, void, void>> {
        return new RequestFactoryDefault(this);
    }

    protected createSemanticProperty<Value>(name: string, value: Value): SemanticProperty<Value> {
        return new SemanticPropertyBase(name, value);
    }

    protected handle<T>(request: Request): T;
    protected handle<T>(request: Request): Promise<T>;
    protected handle<T>(request: Request): T | T[] | undefined {
        const handler = new HandlerMap(this);
        return handler.handle<T>(request);
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