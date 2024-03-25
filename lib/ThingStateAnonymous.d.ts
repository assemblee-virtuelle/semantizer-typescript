import DatasetExt from "rdf-ext/lib/Dataset";
import Resource from "./Resource";
import Thing from "./Thing";
import ThingState from "./ThingState";
export default class ThingStateAnonymous implements ThingState {
    constructor(thing: Thing, nameHint?: string);
    toRdfDatasetExt(): DatasetExt;
    getThing(): Thing;
    getAllValuesAboutStatement(property: string): string[];
    addStatement(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): Thing;
    getUri(): string;
    isAnonymous(): boolean;
}
//# sourceMappingURL=ThingStateAnonymous.d.ts.map