import DatasetExt from "rdf-ext/lib/Dataset";
import Context from "../contracts/Context";
import Thing from "../contracts/Thing";
import ThingState from "./ThingState";
import Resource from "../contracts/Resource";

export abstract class ThingStateDefaultBase implements ThingState {
    
    private _uri: string;
    private _thing: Thing;

    constructor(thing: Thing, uri: string) {
        this._thing = thing;
        this._uri = uri;
    }

    public getThing(): Thing {
        return this._thing;
    }

    public getUri(): string {
        return this._uri;
    }

    public getContext(): Context | undefined {
        return this.getThing().getContext();
    }

    public expand(uri: string): string {
        return this.getThing().expand(uri);
    }

    public shorten(uri: string): string {
        return this.getThing().shorten(uri);
    }

    abstract isAnonymous(): boolean;
    abstract equals(other: Thing): boolean;
    abstract getAllValuesAboutStatement(property: string): string[];
    abstract toRdfDatasetExt(): DatasetExt;
    abstract addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;

}

export default ThingStateDefaultBase;