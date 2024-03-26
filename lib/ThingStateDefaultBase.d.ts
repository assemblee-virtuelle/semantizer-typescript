import DatasetExt from "rdf-ext/lib/Dataset";
import Context from "./Context";
import Thing from "./Thing";
import ThingState from "./ThingState";
import Resource from "./Resource";
export declare abstract class ThingStateDefaultBase implements ThingState {
    private _uri;
    private _thing;
    constructor(thing: Thing, uri: string);
    getThing(): Thing;
    getUri(): string;
    getContext(): Context | undefined;
    expand(uri: string): string;
    shorten(uri: string): string;
    abstract isAnonymous(): boolean;
    abstract equals(other: Thing): boolean;
    abstract getAllValuesAboutStatement(property: string): string[];
    abstract toRdfDatasetExt(): DatasetExt;
    abstract addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
}
export default ThingStateDefaultBase;
//# sourceMappingURL=ThingStateDefaultBase.d.ts.map