import Command from "../command/Command";
import CommandWithTarget from "../command/CommandWithTarget";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface";
import Handler from "./Handler";
import HandlerBase from "./HandlerBase";

export default class SemanticPropertyMapGetter extends HandlerBase<string> {

    private dataset: Map<string, string>;

    constructor(dataset: Map<string, string>, nextHandler: Handler<string> | undefined = undefined) {
        super(nextHandler);
        this.dataset = dataset;
    }

    public handle(command: CommandWithTarget<SemanticPropertyInterface<any>>): string | undefined {
        if (command.getName() === 'getSemanticProperty')
            return this.dataset.get(command.getTarget().getName());
        else return super.handle(command);
    }

}