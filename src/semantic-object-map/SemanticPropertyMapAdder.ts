import Handler from "../core/Handler.js";
import HandlerBase from "../core/HandlerBase.js";
import Command from "../core/Command.js";

export default class SemanticPropertyMapAdder extends HandlerBase<void> {

    constructor(nextHandler: Handler<void> | undefined = undefined) {
        super(nextHandler);
    }

    public handle(command: Command<any>): void {
        if (command.getName() === 'ADD')
            command.execute();
        super.handle(command);
    }

}