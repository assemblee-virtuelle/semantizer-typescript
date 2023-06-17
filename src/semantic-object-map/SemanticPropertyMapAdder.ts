import Handler from "../handler/Handler.js";
import HandlerBase from "../handler/HandlerBase.js";
import Command from "../command/Command.js";

export default class SemanticPropertyMapAdder extends HandlerBase<void> {

    constructor(nextHandler: Handler<void> | undefined = undefined) {
        super(nextHandler);
    }

    public handle(command: Command): void {
        if (command.getName() === 'ADD_SEMANTIC_PROPERTY')
            command.execute();
        super.handle(command);
    }

}