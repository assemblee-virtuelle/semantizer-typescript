export default class CommandDefault {
    constructor(origin, name, execute) {
        this._name = name;
        this._origin = origin;
        this._execute = execute;
    }
    getName() {
        return this._name;
    }
    getOrigin() {
        return this._origin;
    }
    execute() {
        return this._execute();
    }
}
//# sourceMappingURL=CommandDefault.js.map