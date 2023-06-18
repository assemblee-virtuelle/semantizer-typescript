import HandlerRequest from "../../core/HandlerRequest";
import HandlerFilterStrategy from "./HandlerFilterStrategy";

type Behavior = 'ACCEPT' | 'REJECT';

export default class HandlerFilterStrategyByName implements HandlerFilterStrategy {

    private _filtered: string[];
    private _behavior: Behavior;

    public constructor(filteredNames: string[], behavior: Behavior = 'ACCEPT') {
        this._filtered = filteredNames;
        this._behavior = behavior;
    }

    public accept(request: HandlerRequest<any, any, any>): boolean {
        const match = this.match(request);
        return this.isAcceptFilter()? match: !match;
    }

    public getFilteredValues(): string[] {
        return this._filtered;
    }

    public getBehavior(): Behavior {
        return this._behavior;
    }

    public isAcceptFilter(): boolean {
        return 'ACCEPT' === this.getBehavior();
    }

    public isRejectFilter(): boolean {
        return !this.isAcceptFilter();
    }
    
    public match(request: HandlerRequest<any, any, any>): boolean {
        return this.getFilteredValues().includes(request.getIdentifier());
    }

}