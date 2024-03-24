import Contextualized from "./Contextualized";
import { Document, ConstructionParameters } from "./Document";
export declare enum ImportFormat {
    JSON_LD = "jsonld"
}
export interface ResourceCreationParameters {
    semanticId?: string;
    semanticType?: string | string[];
    semanticContainedResource?: Document | Document[];
}
export interface Semantizer extends Contextualized {
    createDocument(parameters?: ConstructionParameters): Document;
    /**
     *
     * @param input The input data to import resources from. See format.
     * @param format Default is ImportFormat.JSON_LD.
     * @param callback A callback function called each time a resource is imported.
     */
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<Document>;
    exportDocument(...input: Document[]): Promise<string>;
}
export default Semantizer;
//# sourceMappingURL=Semantizer.d.ts.map