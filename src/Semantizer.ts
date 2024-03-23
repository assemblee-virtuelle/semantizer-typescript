import Context from "./Context";
import Document from "./Document";

export enum ImportFormat {
    JSON_LD = "jsonld"
}

export interface ResourceCreationParameters {
    semanticId?: string;
    semanticType?: string | string[];
    semanticContainedResource?: Document | Document[];
}

export interface Semantizer {

    createSemanticResource(parameters?: ResourceCreationParameters): Document;

    /**
     * 
     * @param input The input data to import resources from. See format. 
     * @param format Default is ImportFormat.JSON_LD.
     * @param callback A callback function called each time a resource is imported.
     */
    importSemanticResource(input: string, format?: ImportFormat, callback?: Function): Promise<Document>;
    exportSemanticResource(...input: Document[]): Promise<string>;
    //saveResource(semanticId: string): SemanticResource;

    getContext(): Context;
    setContext(context: Context): void;

    shorten(uri: string): string;
    expand(uri: string): string;

}

export default Semantizer;