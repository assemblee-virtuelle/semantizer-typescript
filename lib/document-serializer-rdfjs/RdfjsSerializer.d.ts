import { DocumentSerializer } from "../core/Serializable";
import { IterableDocument } from "../core/Document";
export declare class RdfjsJsonLdSerializer implements DocumentSerializer {
    private makeQuadsFromThing;
    private makeQuadFromStatement;
    serialize(document: IterableDocument<any, any>): Promise<string>;
}
//# sourceMappingURL=RdfjsSerializer.d.ts.map