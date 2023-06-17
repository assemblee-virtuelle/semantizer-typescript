import CommandWithTarget from "../command/CommandWithTarget.js";
import GetCommand from "./GetCommand.js";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface.js";
import Handler from "../handler/Handler.js";
import HandlerBase from "../handler/HandlerBase.js";

export default class SemanticPropertyMapGetter extends HandlerBase<string> {

    constructor(nextHandler: Handler<string> | undefined = undefined) {
        super(nextHandler);
    }

    public handle(command: GetCommand): string | undefined {
        if (command.getName() === 'GET_SEMANTIC_PROPERTY') {
            command.execute();
            return command.getResult();
        }
        else return super.handle(command);
    }

}