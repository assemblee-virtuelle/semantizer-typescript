import HandlerFilterStrategy from "./HandlerFilterStrategy";

type Behavior = 'ACCEPT' | 'REJECT';

export default abstract class HandlerFilterStrategyByName<Request, Filtered> implements HandlerFilterStrategy<Request> {

    private _filtered: Filtered[];
    private _behavior: Behavior;

    public constructor(filtered: Filtered[], behavior: Behavior = 'ACCEPT') {
        this._filtered = filtered;
        this._behavior = behavior;
    }

    public accept(request: Request): boolean {
        const match = this.match(request);
        return this.isAcceptFilter()? match: !match;
    }

    public getFilteredValues(): Filtered[] {
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
    
    public match(request: Request): boolean {
        return this.getFilteredValues().includes(this.getIdentifierFromRequest(request)); // request.getIdentifier()
    }

    protected abstract getIdentifierFromRequest(request: Request): Filtered;

}