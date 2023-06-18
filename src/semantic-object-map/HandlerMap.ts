import Handler from "../core/Handler";
import HandlerAbstract from "../core/HandlerAbstract.js";
import SemanticObjectMap from "./SemanticObjectMap";

export default abstract class HandlerMap<T> extends HandlerAbstract<T> {

    private _map: SemanticObjectMap;

    constructor(map: SemanticObjectMap, nextHandler: Handler<T> | undefined = undefined) {
        super(nextHandler);
        this._map = map;
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

}