import Handler from "../handler/Handler";
import CommandFactory from "./CommandFactory";
import SemanticObject from "./SemanticObject.js";

export default abstract class SemanticObjectWithDataset<Dataset, AddHandler extends Handler<void>, GetHandler extends Handler<any>, SetHandler extends Handler<void>, RemoveHandler extends Handler<void>> extends SemanticObject<AddHandler, GetHandler, SetHandler, RemoveHandler> {

    private _dataset: Dataset;

    public constructor(dataset: Dataset, other?: SemanticObjectWithDataset<Dataset, AddHandler, GetHandler, SetHandler, RemoveHandler>) {
        super(other);
        this._dataset = other? other._dataset: dataset;
    }

    protected getDataset(): Dataset {
        return this._dataset;
    }

    protected abstract getDefaultCommandFactory(): CommandFactory;

}