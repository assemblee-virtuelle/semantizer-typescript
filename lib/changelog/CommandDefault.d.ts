import Command from "./Command";
export default class CommandDefault<Origin, ExecutionResult> implements Command<Origin, ExecutionResult> {
    private _name;
    private _origin;
    private _execute;
    constructor(origin: Origin, name: string, execute: () => ExecutionResult);
    getName(): string;
    getOrigin(): Origin;
    execute(): ExecutionResult;
}
//# sourceMappingURL=CommandDefault.d.ts.map