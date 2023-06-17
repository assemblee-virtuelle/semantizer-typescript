import ChangeKeeper from "./ChangeKeeper";
import Command from "../core/Command";

export default interface Changelogable {

    getChangelog(): ChangeKeeper<string, Command<any>>;

}