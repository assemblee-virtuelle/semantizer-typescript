import SemanticPropertyMapAdder from "../handler/SemanticPropertyMapAdder";
import SemanticPropertyMapGetter from "../handler/SemanticPropertyMapGetter";
import SemanticObject from "./SemanticObject";

export default class SemanticObjectMap extends SemanticObject<SemanticPropertyMapAdder, SemanticPropertyMapGetter, SemanticPropertyMapAdder, SemanticPropertyMapAdder> {
    
    private _dataset: Map<string, string> = new Map<string, string>();
    
    constructor(other?: SemanticObjectMap) {
        super(other);
        this._dataset = new Map<string, string>();;
    }

    protected getDataset(): Map<string, string> {
        return this._dataset;
    }

    protected getDefaultHandlerChainToAddSemanticProperty(): SemanticPropertyMapAdder {
        return new SemanticPropertyMapAdder(this.getDataset())
    }

    protected getDefaultHandlerChainToGetSemanticProperty(): SemanticPropertyMapGetter {
        return new SemanticPropertyMapGetter(this.getDataset())
    }

    protected getDefaultHandlerChainToSetSemanticProperty(): SemanticPropertyMapAdder {
        return new SemanticPropertyMapAdder(this.getDataset())
    }

    protected getDefaultHandlerChainToRemoveSemanticProperty(): SemanticPropertyMapAdder {
        return new SemanticPropertyMapAdder(this.getDataset())
    }

}