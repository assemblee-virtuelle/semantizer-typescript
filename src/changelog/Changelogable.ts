import ChangeKeeper from "./ChangeKeeper";
import Command from "./Command";

export default interface Changelogable {

    getChangelog(): ChangeKeeper<string, Command<any, any>>;

}