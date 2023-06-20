import SemanticObjectWithDataset from "./SemanticObjectWithDataset.js";
import SemanticProperty from "./SemanticProperty.js";
import SemanticPropertyDefault from "./SemanticPropertyDefault.js";
import RequestFactory from "./RequestFactory.js";
import Semanticable from "./Semanticable.js";
import RequestFactoryDefault from "./RequestFactoryDefault.js";
import SemanticObjectDefaultHandler from "./SemanticObjectDefaultHandler.js";
import SemanticObjectRequest from "./SemanticObjectRequest.js";
import RequestHandler from "./RequestHandler.js";

type Property = SemanticProperty<any>;
type Request = SemanticObjectRequest<any, void, void, void>;

export default class SemanticObjectDefault extends SemanticObjectWithDataset<Array<Property>, void, void, void> {

    constructor(other?: SemanticObjectDefault) {
        super(new Array<Property>(), other);
    }

    protected getDefaultRequestFactory(): RequestFactory<Semanticable<void, void, void>> {
        return new RequestFactoryDefault(this);
    }

    protected getDefaultRequestHandler(): RequestHandler<Request> {
        return new SemanticObjectDefaultHandler(this);
    }

    protected createSemanticProperty<Value>(name: string, value: Value): SemanticProperty<Value> {
        return new SemanticPropertyDefault(name, value);
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