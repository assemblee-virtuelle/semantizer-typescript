import Context from "./Context";
import Resource from "./Document";
export declare enum ImportFormat {
    JSON_LD = "jsonld"
}
export interface ResourceCreationParameters {
    semanticId?: string;
    semanticType?: string | string[];
    semanticContainedResource?: Resource | Resource[];
}
export interface Semantizer {
    createSemanticResource(parameters?: ResourceCreationParameters): Resource;
    /**
     *
     * @param input The input data to import resources from. See format.
     * @param format Default is ImportFormat.JSON_LD.
     * @param callback A callback function called each time a resource is imported.
     */
    importSemanticResource(input: string, format?: ImportFormat, callback?: Function): Promise<Resource>;
    exportSemanticResource(...input: Resource[]): Promise<string>;
    getContext(): Context;
    setContext(context: Context): void;
    shorten(uri: string): string;
    expand(uri: string): string;
}
export default Semantizer;
//# sourceMappingURL=Semantizer.d.ts.map