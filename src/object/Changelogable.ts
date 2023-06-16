import ChangeKeeper from "../changelog/ChangeKeeper";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface";
import CommandWithTarget from "../command/CommandWithTarget";

export default interface Changelogable {

    getChangelog(): ChangeKeeper<string, CommandWithTarget<SemanticPropertyInterface<any>>>;

}