import CommandFactory from "../core/CommandFactory.js";
import CommandFactoryMap from "./CommandFactoryMap.js";
import SemanticObjectWithDataset from "../core/SemanticObjectWithDataset.js";
import HandlerBase from "../core/HandlerBase.js";
import Command from "../core/Command.js";
import Handler from "../core/Handler.js";

export default class SemanticObjectMap extends SemanticObjectWithDataset<Map<string, string>, string | undefined, Handler<void>, Handler<string>, Handler<void>, Handler<void>> {
    
    constructor(other?: SemanticObjectMap) {
        super(new Map<string, string>(), other);
    }

    protected getDefaultCommandFactory(): CommandFactory<string | undefined> {
        return new CommandFactoryMap(this);
    }

    protected getDefaultHandlerChainToAddSemanticProperty(): Handler<void> {
        const executor = (command: Command<any>) => command.getName() === 'ADD'? command.execute(): undefined;
        return new HandlerBase(executor);
    }

    protected getDefaultHandlerChainToGetSemanticProperty(): Handler<string> {
        const executor = (command: Command<any>) => command.getName() === 'GET'? command.execute(): undefined;
        return new HandlerBase(executor);
    }

    protected getDefaultHandlerChainToSetSemanticProperty(): Handler<void> {
        const executor = (command: Command<any>) => command.getName() === 'ADD'? command.execute(): undefined;
        return new HandlerBase(executor);
    }

    protected getDefaultHandlerChainToRemoveSemanticProperty(): Handler<void> {
        const executor = (command: Command<any>) => command.getName() === 'ADD'? command.execute(): undefined;
        return new HandlerBase(executor);
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