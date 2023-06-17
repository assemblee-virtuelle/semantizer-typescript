import Command from "../core/Command.js";
import Handler from "../core/Handler.js";
import HandlerBase from "../core/HandlerBase.js";

export default class SemanticPropertyMapGetter extends HandlerBase<string> {

    constructor(nextHandler: Handler<string> | undefined = undefined) {
        super(nextHandler);
    }

    public handle(command: Command<any>): string | undefined {
        if (command.getName() === 'GET') {
            return command.execute();
        }
        else return super.handle(command);
    }

}