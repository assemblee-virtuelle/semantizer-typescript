import Command from "../core/Command";
import SemanticObjectMap from "./SemanticObjectMap";

export default interface CommandMap<T> extends Command<T> {

    getMap(): SemanticObjectMap;

}