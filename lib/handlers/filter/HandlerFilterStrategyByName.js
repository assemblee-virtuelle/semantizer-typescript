export default class HandlerFilterStrategyByName {
    constructor(filtered, behavior = 'ACCEPT') {
        this._filtered = filtered;
        this._behavior = behavior;
    }
    accept(request) {
        const match = this.match(request);
        return this.isAcceptFilter() ? match : !match;
    }
    getFilteredValues() {
        return this._filtered;
    }
    getBehavior() {
        return this._behavior;
    }
    isAcceptFilter() {
        return 'ACCEPT' === this.getBehavior();
    }
    isRejectFilter() {
        return !this.isAcceptFilter();
    }
    match(request) {
        return this.getFilteredValues().includes(this.getIdentifierFromRequest(request)); // request.getIdentifier()
    }
}
//# sourceMappingURL=HandlerFilterStrategyByName.js.map