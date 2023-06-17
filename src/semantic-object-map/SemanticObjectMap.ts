import SemanticPropertyMapAdder from "./SemanticPropertyMapAdder.js";
import SemanticPropertyMapGetter from "./SemanticPropertyMapGetter.js";
import CommandFactory from "../core/CommandFactory.js";
import CommandFactoryMap from "./CommandFactoryMap.js";
import SemanticObjectWithDataset from "../core/SemanticObjectWithDataset.js";

export default class SemanticObjectMap extends SemanticObjectWithDataset<Map<string, string>, string | undefined, SemanticPropertyMapAdder, SemanticPropertyMapGetter, SemanticPropertyMapAdder, SemanticPropertyMapAdder> {
    
    constructor(other?: SemanticObjectMap) {
        super(new Map<string, string>(), other);
    }

    protected getDefaultCommandFactory(): CommandFactory<string | undefined> {
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