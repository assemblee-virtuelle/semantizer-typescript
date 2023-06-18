import HandlerRequest from "../../core/HandlerRequest";

export default interface HandlerFilterStrategy {

    accept(request: HandlerRequest<any, any, any>): boolean;

}