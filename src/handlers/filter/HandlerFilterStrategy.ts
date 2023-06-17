import Command from "../../core/Command";
import Handler from "../../core/Handler";

export default interface HandlerFilterStrategy<T> {

    filter(handler: Handler<any>, command: Command<any, any>): T | undefined;

}