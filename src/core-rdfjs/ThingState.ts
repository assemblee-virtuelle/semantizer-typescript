import DatasetExt from "rdf-ext/lib/Dataset";
import Resource from "../core/Resource";
import ThingBase from "../core/Thing";

export default interface ThingState {
    getUri(): string;
    getThing(): ThingBase;
    isAnonymous(): boolean;
    equals(other: ThingBase): boolean;
    getAllValuesAboutStatement(property: string): string[];
    toRdfDatasetExt(): DatasetExt;
    addStatement(about: string, value: string | Resource, datatype?: string, language?: string): ThingBase;
}