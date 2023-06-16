import CommandWithTarget from "../command/CommandWithTarget";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface";
import Handler from "./Handler";
import HandlerBase from "./HandlerBase";

export default class SemanticPropertyMapAdder extends HandlerBase<void> {

    private dataset: Map<string, string>;

    constructor(dataset: Map<string, string>, nextHandler: Handler<void> | undefined = undefined) {
        super(nextHandler);
        this.dataset = dataset;
    }

    private handleAddSemanticProperty(command: CommandWithTarget<SemanticPropertyInterface<any>>): void {
        this.dataset.set(command.getTarget().getName(), command.getTarget().getValue());
    }

    public handle(command: CommandWithTarget<SemanticPropertyInterface<any>>): void {
        if (command.getName() === 'addSemanticProperty')
            this.handleAddSemanticProperty(command);
        else super.handle(command);
    }

}