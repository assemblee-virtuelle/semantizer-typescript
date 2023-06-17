import SemanticPropertyMapAdder from "../handler/SemanticPropertyMapAdder.js";
import SemanticPropertyMapGetter from "../handler/SemanticPropertyMapGetter.js";
import CommandFactory from "./CommandFactory";
import CommandFactoryMap from "./CommandFactoryMap.js";
import SemanticObjectWithDataset from "./SemanticObjectWithDataset.js";

export default class SemanticObjectMap extends SemanticObjectWithDataset<Map<string, string>, SemanticPropertyMapAdder, SemanticPropertyMapGetter, SemanticPropertyMapAdder, SemanticPropertyMapAdder> {
    
    constructor(other?: SemanticObjectMap) {
        super(new Map<string, string>(), other);
    }

    protected getDefaultCommandFactory(): CommandFactory {
        return new CommandFactoryMap(this);
    }

    protected getDefaultHandlerChainToAddSemanticProperty(): SemanticPropertyMapAdder {
        return new SemanticPropertyMapAdder();
    }

    protected getDefaultHandlerChainToGetSemanticProperty(): SemanticPropertyMapGetter {
        return new SemanticPropertyMapGetter();
    }

    protected getDefaultHandlerChainToSetSemanticProperty(): SemanticPropertyMapAdder {
        return new SemanticPropertyMapAdder();
    }

    protected getDefaultHandlerChainToRemoveSemanticProperty(): SemanticPropertyMapAdder {
        return new SemanticPropertyMapAdder();
    }

    public get(key: string): string {
        return this.getDataset().get(key) ?? "";
    }

    public set(key: string, value: string): void {
        this.getDataset().set(key, value);
    }

    public unset(key: string): void {
        this.getDataset().delete(key);
    }

}