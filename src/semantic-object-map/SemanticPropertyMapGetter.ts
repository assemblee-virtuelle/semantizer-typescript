import Command from "../command/Command.js";
import Handler from "../handler/Handler.js";
import HandlerBase from "../handler/HandlerBase.js";

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