import ChangeKeeper from "../changelog/ChangeKeeper";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface";
import CommandWithResult from "../command/CommandWithResult";

export default interface Changelogable {

    getChangelog(): ChangeKeeper<string, CommandWithResult<SemanticPropertyInterface<any>>>;

}