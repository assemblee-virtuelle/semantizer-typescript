import { Document, IterableDocument } from "./Document";
import { Statement } from "./Statement";
import { Thing } from "./Thing";
export interface N3Serializable {
    toN3(): string;
}
export interface TurtleSerializable {
    toTurtle(): string;
}
export interface JsonLdSerializable {
    toJsonLd(): string;
}
export interface DocumentSerializer {
    serialize(document: IterableDocument<any, any>): Promise<string>;
}
export interface DocumentParser {
    parse(input: string): Promise<Document<Thing<Statement>, Thing<Statement>>>;
}
//# sourceMappingURL=Serializable.d.ts.map