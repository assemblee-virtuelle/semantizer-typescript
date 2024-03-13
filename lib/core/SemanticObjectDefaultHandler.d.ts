import RequestHandlerAbstract from "./RequestHandlerAbstract.js";
import SemanticObjectDefault from "./SemanticObjectDefault.js";
export default class SemanticObjectDefaultHandler extends RequestHandlerAbstract<SemanticObjectDefault, string, any> {
    private createCommand;
    handle<T>(sparqlRequest: string): T | undefined;
    handle<T>(sparqlRequest: string): Promise<T | undefined>;
}
export declare abstract class SemanticObjectDefaultHandlerCommand {
    private _name;
    private _semanticObject;
    constructor(semanticObject: SemanticObjectDefault, name: string);
    getSemanticObject(): SemanticObjectDefault;
    getName(): string;
    abstract execute<T>(): any;
}
export declare abstract class SemanticObjectDefaultHandlerCommandWithValue<T> extends SemanticObjectDefaultHandlerCommand {
    private _value;
    constructor(semanticObject: SemanticObjectDefault, name: string, value: T);
    getValue(): T;
}
export declare abstract class SemanticObjectDefaultHandlerCommandWithOldValue<T> extends SemanticObjectDefaultHandlerCommandWithValue<T> {
    private _oldValue;
    constructor(semanticObject: SemanticObjectDefault, name: string, newValue: T, oldValue: T);
    getOldValue(): T;
}
export declare class SemanticObjectDefaultHandlerCommandAdd<T> extends SemanticObjectDefaultHandlerCommandWithValue<T> {
    execute<T>(): void;
}
export declare class SemanticObjectDefaultHandlerCommandGet extends SemanticObjectDefaultHandlerCommand {
    execute<T>(): T | undefined;
}
export declare class SemanticObjectDefaultHandlerCommandGetAll extends SemanticObjectDefaultHandlerCommand {
    execute<T>(): T[];
}
export declare class SemanticObjectDefaultHandlerCommandSet<T> extends SemanticObjectDefaultHandlerCommandWithOldValue<T> {
    execute<T>(): void;
}
export declare class SemanticObjectDefaultHandlerCommandRemove<T> extends SemanticObjectDefaultHandlerCommandWithValue<T> {
    execute<T>(): void;
}
//# sourceMappingURL=SemanticObjectDefaultHandler.d.ts.map