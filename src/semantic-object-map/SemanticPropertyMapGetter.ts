import Handler from "../handler/Handler.js";
import HandlerBase from "../handler/HandlerBase.js";
import CommandWithResult from "../command/CommandWithResult.js";

export default class SemanticPropertyMapGetter extends HandlerBase<string> {

    constructor(nextHandler: Handler<string> | undefined = undefined) {
        super(nextHandler);
    }

    public handle(command: CommandWithResult<string>): string | undefined {
        if (command.getName() === 'GET_SEMANTIC_PROPERTY') {
            command.execute();
            return command.getResult();
        }
        else return super.handle(command);
    }

}