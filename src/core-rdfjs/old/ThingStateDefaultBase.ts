import DatasetExt from "rdf-ext/lib/Dataset";
import Context from "../../core/ContextImpl";
import ThingBase from "../../core/Thing";
import ThingState from "./ThingState";
import Resource from "../core/Resource";

export abstract class ThingStateDefaultBase implements ThingState {
    
    private _uri: string;
    private _thing: ThingBase;

    constructor(thing: ThingBase, uri: string) {
        this._thing = thing;
        this._uri = uri;
    }

    public getThing(): ThingBase {
        return this._thing;
    }

    public getUri(): string {
        return this._uri;
    }

    public getContext(): Context | undefined {
        return this.getThing().getContext();
    }

    public expand(uri: string): string {
        return this.getThing().getContext()?.expand(uri) ?? uri;
    }

    public shorten(uri: string): string {
        return this.getThing().getContext()?.shorten(uri) ?? uri;
    }

    abstract isAnonymous(): boolean;
    abstract equals(other: ThingBase): boolean;
    abstract getAllValuesAboutStatement(property: string): string[];
    abstract toRdfDatasetExt(): DatasetExt;
    abstract addStatement(about: string, value: string | Resource, datatype?: string, language?: string): ThingBase;

}

export default ThingStateDefaultBase;