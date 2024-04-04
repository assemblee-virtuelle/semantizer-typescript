import DatasetExt from "rdf-ext/lib/Dataset";
import Context from "../core/Context";
import ThingBase from "../core/Thing";
import ThingState from "./ThingState";
import Resource from "../core/Resource";
export declare abstract class ThingStateDefaultBase implements ThingState {
    private _uri;
    private _thing;
    constructor(thing: ThingBase, uri: string);
    getThing(): ThingBase;
    getUri(): string;
    getContext(): Context | undefined;
    expand(uri: string): string;
    shorten(uri: string): string;
    abstract isAnonymous(): boolean;
    abstract equals(other: ThingBase): boolean;
    abstract getAllValuesAboutStatement(property: string): string[];
    abstract toRdfDatasetExt(): DatasetExt;
    abstract addStatement(about: string, value: string | Resource, datatype?: string, language?: string): ThingBase;
}
export default ThingStateDefaultBase;
//# sourceMappingURL=ThingStateDefaultBase.d.ts.map