import RequestHandler from "./RequestHandler";
export default abstract class RequestHandlerAbstract<Handled, Input, Output> implements RequestHandler<Input, Output> {
    private _handled;
    private _output;
    private _previousHandler;
    private _nextHandler;
    constructor(handled: Handled);
    constructor(nextHandler: RequestHandlerAbstract<Handled, Output, any>);
    getPreviousHandler(): RequestHandler<Input, any> | undefined;
    private setPreviousHandler;
    handle<T>(request: Input | Output): T | undefined;
    handle<T>(request: Input | Output): Promise<T | undefined>;
    getOutput(): Output | undefined;
    getOutput(): Promise<Output | undefined>;
    private setOutput;
    getHandled(): Handled;
    getNext(): RequestHandlerAbstract<Handled, Output, any> | undefined;
    hasNext(): boolean;
    setNext(handler: RequestHandlerAbstract<Handled, Output, any>): void;
}
//# sourceMappingURL=RequestHandlerAbstract.d.ts.map