import { Context } from "./core/src/Common";
import { DocumentWithNonDestructiveOperations } from "./core/src/Document";

export enum ImportFormat {
    JSON_LD = "jsonld"
}

export interface ResourceCreationParameters {
    semanticId?: string;
    semanticType?: string | string[];
    semanticContainedResource?: DocumentWithNonDestructiveOperations<any, any> | DocumentWithNonDestructiveOperations<any, any>[];
}

export interface Semantizer {

    getContext(): Context | undefined;
    setContext(context: Context): void;
    expand(uri: string): string;
    shorten(uri: string): string;

    createDocument(uri?: string, context?: Context): DocumentWithNonDestructiveOperations<any, any>; // TODO: drop fragment in name
    // getDocument(uri: string): Promise<Document>;

    /**
     * 
     * @param input The input data to import resources from. See format. 
     * @param format Default is ImportFormat.JSON_LD.
     * @param callback A callback function called each time a resource is imported.
     */
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<DocumentWithNonDestructiveOperations<any, any>>;
    exportDocument(...input: DocumentWithNonDestructiveOperations<any, any>[]): Promise<string>;
    //saveResource(semanticId: string): SemanticResource;

}

export default Semantizer;