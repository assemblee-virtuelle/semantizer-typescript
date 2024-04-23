import { Context } from "./core/Common";
import { Document } from "./core/Document";
export declare enum ImportFormat {
    JSON_LD = "jsonld"
}
export interface ResourceCreationParameters {
    semanticId?: string;
    semanticType?: string | string[];
    semanticContainedResource?: Document<any, any> | Document<any, any>[];
}
export interface Semantizer {
    getContext(): Context | undefined;
    setContext(context: Context): void;
    expand(uri: string): string;
    shorten(uri: string): string;
    createDocument(uri?: string, context?: Context): Document<any, any>;
    /**
     *
     * @param input The input data to import resources from. See format.
     * @param format Default is ImportFormat.JSON_LD.
     * @param callback A callback function called each time a resource is imported.
     */
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<Document<any, any>>;
    exportDocument(...input: Document<any, any>[]): Promise<string>;
}
export default Semantizer;
//# sourceMappingURL=Semantizer.d.ts.map