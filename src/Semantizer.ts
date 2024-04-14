import { Context } from "./core/Context";
import { DocumentBase } from "./core/Document";

export enum ImportFormat {
    JSON_LD = "jsonld"
}

export interface ResourceCreationParameters {
    semanticId?: string;
    semanticType?: string | string[];
    semanticContainedResource?: DocumentBase<any, any> | DocumentBase<any, any>[];
}

export interface Semantizer {

    getContext(): Context | undefined;
    setContext(context: Context): void;
    expand(uri: string): string;
    shorten(uri: string): string;

    createDocument(uri?: string, context?: Context): DocumentBase<any, any>; // TODO: drop fragment in name
    // getDocument(uri: string): Promise<Document>;

    /**
     * 
     * @param input The input data to import resources from. See format. 
     * @param format Default is ImportFormat.JSON_LD.
     * @param callback A callback function called each time a resource is imported.
     */
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<DocumentBase<any, any>>;
    exportDocument(...input: DocumentBase<any, any>[]): Promise<string>;
    //saveResource(semanticId: string): SemanticResource;

}

export default Semantizer;