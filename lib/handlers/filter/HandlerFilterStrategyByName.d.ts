import HandlerFilterStrategy from "./HandlerFilterStrategy";
type Behavior = 'ACCEPT' | 'REJECT';
export default abstract class HandlerFilterStrategyByName<Request, Filtered> implements HandlerFilterStrategy<Request> {
    private _filtered;
    private _behavior;
    constructor(filtered: Filtered[], behavior?: Behavior);
    accept(request: Request): boolean;
    getFilteredValues(): Filtered[];
    getBehavior(): Behavior;
    isAcceptFilter(): boolean;
    isRejectFilter(): boolean;
    match(request: Request): boolean;
    protected abstract getIdentifierFromRequest(request: Request): Filtered;
}
export {};
//# sourceMappingURL=HandlerFilterStrategyByName.d.ts.map