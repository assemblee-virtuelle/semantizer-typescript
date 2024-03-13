export default interface Command<Origin, ExecutionResult> {
    getOrigin(): Origin;
    getName(): string;
    execute(): ExecutionResult;
}
//# sourceMappingURL=Command.d.ts.map