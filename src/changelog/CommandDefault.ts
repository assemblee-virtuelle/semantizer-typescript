import Command from "./Command";

export default class CommandDefault<Origin, ExecutionResult> implements Command<Origin, ExecutionResult> {

    private _name: string;
    private _origin: Origin;
    private _execute: Function;

    public constructor(origin: Origin, name: string, execute: () => ExecutionResult) {
        this._name = name;
        this._origin = origin;
        this._execute = execute;
    }

    public getName(): string {
        return this._name;
    }

    public getOrigin(): Origin {
        return this._origin;
    }

    public execute(): ExecutionResult {
        return this._execute();
    }

}