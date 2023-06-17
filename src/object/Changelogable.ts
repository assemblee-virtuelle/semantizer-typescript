import ChangeKeeper from "../changelog/ChangeKeeper";
import Command from "../command/Command";

export default interface Changelogable {

    getChangelog(): ChangeKeeper<string, Command<any>>;

}