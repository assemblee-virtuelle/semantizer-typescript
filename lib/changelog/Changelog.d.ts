import { Document, DocumentWritable } from "../core/Document";
import { Statement } from "../core/Statement";
import { Thing } from "../core/Thing";
export type DocumentWithChangelogConstructor<ContainedThing extends Thing<any> = Thing, SelfDescribingThing extends Thing<any> = Thing> = new (...args: any[]) => DocumentWritable<ContainedThing, SelfDescribingThing> & WithChangelog;
export interface WithChangelog<StatementType extends Statement = Statement> {
    getChangelog(): Changelog<StatementType>;
}
export interface WithReadOperations<StatementType extends Statement = Statement> {
    getAdded(): StatementType[];
    getUpdated(): StatementType[];
    getDeleted(): StatementType[];
}
export interface WithWriteOperations<StatementType extends Statement = Statement> {
    registerAdded(statement: StatementType): Changelog<StatementType>;
    registerUpdated(statement: StatementType): Changelog<StatementType>;
    registerDeleted(statement: StatementType): Changelog<StatementType>;
}
export interface WithCreateOperations<DocumentType extends Document<any, any>> {
    applyTo(document: DocumentType): DocumentType;
}
export type Changelog<StatementType extends Statement = Statement> = WithReadOperations<StatementType>;
export type ChangelogWritable<StatementType extends Statement = Statement> = WithReadOperations<StatementType> & WithWriteOperations<StatementType>;
//# sourceMappingURL=Changelog.d.ts.map