import HandlerRequest from "./HandlerRequest";
import RequestFactory from "./RequestFactory";
import SemanticObject from "./SemanticObject.js";
import Semanticable from "./Semanticable";

type Request = HandlerRequest<any, any, Semanticable>;

export default abstract class SemanticObjectWithDataset<Dataset> extends SemanticObject {

    private _dataset: Dataset;

    public constructor(dataset: Dataset, other?: SemanticObjectWithDataset<Dataset>) {
        super(other);
        this._dataset = other? other._dataset: dataset;
    }

    protected getDataset(): Dataset {
        return this._dataset;
    }

    protected abstract getDefaultRequestFactory(): RequestFactory<Semanticable>;
    protected abstract handle<T>(request: Request): T;
    protected abstract handle<T>(request: Request): Promise<T>;

}