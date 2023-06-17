import Command from "../../core/Command";
import Handler from "../../core/Handler";
import HandlerFilterStrategy from "./HandlerFilterStrategy";

type Behavior = 'ACCEPT_AND_CONTINUE' | 'ACCEPT_AND_STOP' | 'REJECT_AND_CONTINUE' | 'REJECT_AND_STOP';

export default class HandlerFilterStrategyByName<T> implements HandlerFilterStrategy<T> {

    private _filteredNames: string[];
    private _behavior: Behavior;

    public constructor(filteredNames: string[], behavior: Behavior = 'ACCEPT_AND_CONTINUE') {
        this._filteredNames = filteredNames;
        this._behavior = behavior;
    }

    public getFilteredNames(): string[] {
        return this._filteredNames;
    }

    public getBehavior(): Behavior {
        return this._behavior;
    }

    public isAcceptFilter(): boolean {
        return ['ACCEPT_AND_CONTINUE', 'ACCEPT_AND_STOP'].includes(this.getBehavior());
    }

    public isRejectFilter(): boolean {
        return !this.isAcceptFilter();
    }

    public continueToProcessChain(): boolean {
        return ['ACCEPT_AND_CONTINUE', 'REJECT_AND_CONTINUE'].includes(this.getBehavior());
    }

    private match(command: Command<any, any>): boolean {
        return this.getFilteredNames().includes(command.getName());
    }

    private executeCommandIfMatchedAndAccepted(command: Command<any, any>): T | undefined {
        return this.match(command) && this.isAcceptFilter()? command.execute(): undefined;
    }

    private processNextHandlerIfNecessaryOrReturnPassedResult(handler: Handler<any>, command: Command<any, any>, result: T | undefined): T | undefined {
        return this.continueToProcessChain() && handler.hasNext()? handler.getNext()!.handle(command): result;
    }

    public filter(handler: Handler<any>, command: Command<any, any>): T | undefined {
        const result = this.executeCommandIfMatchedAndAccepted(command);
        return this.processNextHandlerIfNecessaryOrReturnPassedResult(handler, command, result);
    }

}