import ChangeKeeper from "../changelog/ChangeKeeper";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface";
import SemanticableCommand from "./SemanticableCommand";

export default interface Changelogable {

    getChangelog(): ChangeKeeper<string, SemanticableCommand<SemanticPropertyInterface<any>>>;

}