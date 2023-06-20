export default interface HandlerFilterStrategy<Request> {

    accept(request: Request): boolean;

}