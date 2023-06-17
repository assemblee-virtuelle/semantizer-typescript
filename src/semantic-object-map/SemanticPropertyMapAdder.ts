import CommandWithTarget from "../command/CommandWithTarget.js";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface.js";
import Handler from "../handler/Handler.js";
import HandlerBase from "../handler/HandlerBase.js";

export default class SemanticPropertyMapAdder extends HandlerBase<void> {

    constructor(nextHandler: Handler<void> | undefined = undefined) {
        super(nextHandler);
    }

    public handle(command: CommandWithTarget<SemanticPropertyInterface<any>>): void {
        if (command.getName() === 'ADD_SEMANTIC_PROPERTY')
            command.execute();
        super.handle(command);
    }

}