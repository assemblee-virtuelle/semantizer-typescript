import { Document, DocumentWithNonDestructiveOperations, IterableDocument } from "./Document";
import { Statement, StatementWithNonDestructiveOperations } from "./Statement";
import { Thing, IterableThing } from "./Thing";

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