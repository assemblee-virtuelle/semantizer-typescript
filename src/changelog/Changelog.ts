import { DocumentBase, StatementOf, WithWriteOperations as DocumentWriteOperations, DocumentReadonly } from "../core/Document";

type DocumentWithWriteOperations<
    DocumentType extends DocumentBase<any, any>
> = DocumentBase<any, any> & DocumentWriteOperations<DocumentType>;

export interface WithChangelog<
    DocumentType extends DocumentBase<any, any>
> {
    getChangelog(): ChangelogReadonly<DocumentType>;
}

export interface WithReadOperations<
    DocumentType extends DocumentBase<any, any>
> {
    getAdded(): StatementOf<DocumentType>[];
    getUpdated(): StatementOf<DocumentType>[];
    getDeleted(): StatementOf<DocumentType>[];
}

export interface WithWriteOperations<
    DocumentType extends DocumentWithWriteOperations<DocumentType>
> {
    registerAdded(statement: StatementOf<DocumentType>): Changelog<DocumentType>;
    registerUpdated(statement: StatementOf<DocumentType>): Changelog<DocumentType>;
    registerDeleted(statement: StatementOf<DocumentType>): Changelog<DocumentType>;
}

export interface WithCreateOperations<
    DocumentType extends DocumentWithWriteOperations<DocumentType>
> {
    applyTo(document: DocumentType): DocumentType;
}

export type Changelog<
    DocumentType extends DocumentWithWriteOperations<DocumentType>
> = WithReadOperations<DocumentType> & 
    WithWriteOperations<DocumentType> & 
    WithCreateOperations<DocumentType>;

export type ChangelogReadonly<
    DocumentType extends DocumentBase<any, any>
> = WithReadOperations<DocumentType>;