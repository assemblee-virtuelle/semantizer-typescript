import RequestHandlerAbstract from "./RequestHandlerAbstract.js";
export default class SemanticObjectDefaultHandler extends RequestHandlerAbstract {
    createCommand(request) {
        let command;
        const payload = request.split(';');
        const convert = (valueWithType) => {
            const splited = valueWithType.split('^^');
            let value = splited[0];
            const type = splited[1];
            if (type === 'boolean')
                return (value === 'true') ? true : false;
            if (type === 'number')
                return Number.parseInt(value);
            return value;
        };
        switch (payload[0]) {
            case 'ADD':
                command = new SemanticObjectDefaultHandlerCommandAdd(this.getHandled(), payload[1], convert(payload[2]));
                break;
            case 'GET':
                command = new SemanticObjectDefaultHandlerCommandGet(this.getHandled(), payload[1]);
                break;
            case 'GET_ALL':
                command = new SemanticObjectDefaultHandlerCommandGetAll(this.getHandled(), payload[1]);
                break;
            case 'SET':
                command = new SemanticObjectDefaultHandlerCommandSet(this.getHandled(), payload[1], convert(payload[2]), convert(payload[3]));
                break;
            case 'REMOVE':
                command = new SemanticObjectDefaultHandlerCommandRemove(this.getHandled(), payload[1], convert(payload[2]));
                break;
            default:
                throw new Error("Unable to create command for the request: unknown identifier.");
                break;
        }
        return command;
    }
    handle(sparqlRequest) {
        var _a;
        return super.handle((_a = this.createCommand(sparqlRequest)) === null || _a === void 0 ? void 0 : _a.execute());
    }
}
export class SemanticObjectDefaultHandlerCommand {
    constructor(semanticObject, name) {
        this._name = name;
        this._semanticObject = semanticObject;
    }
    getSemanticObject() {
        return this._semanticObject;
    }
    getName() {
        return this._name;
    }
}
export class SemanticObjectDefaultHandlerCommandWithValue extends SemanticObjectDefaultHandlerCommand {
    constructor(semanticObject, name, value) {
        super(semanticObject, name);
        this._value = value;
    }
    getValue() {
        return this._value;
    }
}
export class SemanticObjectDefaultHandlerCommandWithOldValue extends SemanticObjectDefaultHandlerCommandWithValue {
    constructor(semanticObject, name, newValue, oldValue) {
        super(semanticObject, name, newValue);
        this._oldValue = oldValue;
    }
    getOldValue() {
        return this._oldValue;
    }
}
export class SemanticObjectDefaultHandlerCommandAdd extends SemanticObjectDefaultHandlerCommandWithValue {
    execute() {
        return this.getSemanticObject().add(this.getName(), this.getValue());
    }
}
export class SemanticObjectDefaultHandlerCommandGet extends SemanticObjectDefaultHandlerCommand {
    execute() {
        var _a;
        return (_a = this.getSemanticObject().get(this.getName())) === null || _a === void 0 ? void 0 : _a.getValue();
    }
}
export class SemanticObjectDefaultHandlerCommandGetAll extends SemanticObjectDefaultHandlerCommand {
    execute() {
        const properties = this.getSemanticObject().getAll(this.getName());
        return properties.map((p) => p.getValue());
    }
}
export class SemanticObjectDefaultHandlerCommandSet extends SemanticObjectDefaultHandlerCommandWithOldValue {
    execute() {
        return this.getSemanticObject().set(this.getName(), this.getValue(), this.getOldValue());
    }
}
export class SemanticObjectDefaultHandlerCommandRemove extends SemanticObjectDefaultHandlerCommandWithValue {
    execute() {
        return this.getSemanticObject().unset(this.getName(), this.getValue());
    }
}
//# sourceMappingURL=SemanticObjectDefaultHandler.js.map