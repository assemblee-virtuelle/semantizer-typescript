import CommandWithResult from "./CommandWithResult";

export default abstract class CommandWithResultBase<T> implements CommandWithResult<T> {
    
    private _result: T | undefined;
    
    abstract execute(): void;
    abstract getName(): string;

    protected setResult(result: T | undefined): void {
        this._result = result;
    }
    
    public getResult(): T | undefined {
        return this._result;
    }
    
}