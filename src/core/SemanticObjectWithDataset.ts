import Request from "./Request";
import RequestFactory from "./RequestFactory";
import SemanticObject from "./SemanticObject.js";
import Semanticable from "./Semanticable";

type SemanticRequest<Add, Set, Remove> = Request<any, any, any, Semanticable<Add, Set, Remove>>;

export default abstract class SemanticObjectWithDataset<Dataset, Add, Set, Remove> extends SemanticObject<Add, Set, Remove> {

    private _dataset: Dataset;

    public constructor(dataset: Dataset, other?: SemanticObjectWithDataset<Dataset, Add, Set, Remove>) {
        super(other);
        this._dataset = other? other._dataset: dataset;
    }

    protected getDataset(): Dataset {
        return this._dataset;
    }

    protected abstract getDefaultRequestFactory(): RequestFactory<Semanticable<Add, Set, Remove>>;
    protected abstract handle<T>(request: SemanticRequest<Add, Set, Remove>): T;
    protected abstract handle<T>(request: SemanticRequest<Add, Set, Remove>): Promise<T>;

}