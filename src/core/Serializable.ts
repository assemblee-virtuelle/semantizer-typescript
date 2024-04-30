import { DocumentWithNonDestructiveOperations } from "./Document";

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
    serialize(document: DocumentWithNonDestructiveOperations<any, any>): Promise<string>;
}