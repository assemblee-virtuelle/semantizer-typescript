import DatasetExt from "rdf-ext/lib/Dataset";
import Resource from "../contracts/Resource";
import Thing from "../contracts/Thing";

export default interface ThingState {
    getUri(): string;
    getThing(): Thing;
    isAnonymous(): boolean;
    equals(other: Thing): boolean;
    getAllValuesAboutStatement(property: string): string[];
    toRdfDatasetExt(): DatasetExt;
    addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
}