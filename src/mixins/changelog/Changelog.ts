import { DocumentWithNonDestructiveOperations, Document } from "../core/Document";
import { Statement } from "../core/Statement";
import { ThingWithNonDestructiveOperations } from "../core/Thing";

export type DocumentWithChangelogConstructor<
    ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations, 
    SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations,
> = new (...args: any[]) => Document<ContainedThing, SelfDescribingThing> & WithChangelog;

export interface WithChangelog<
    StatementType extends Statement = Statement,
> {
    getChangelog(): Changelog<StatementType>;
}

export interface ChangelogNonDestructiveOperations<
    StatementType extends Statement = Statement,
> {
    getAdded(): StatementType[];
    getUpdated(): StatementType[];
    getDeleted(): StatementType[];
}

export interface ChangelogDestructiveOperations<
    StatementType extends Statement = Statement,
> {
    registerAdded(statement: StatementType): Changelog<StatementType>;
    registerUpdated(statement: StatementType): Changelog<StatementType>;
    registerDeleted(statement: StatementType): Changelog<StatementType>;
}

export interface ChangelogAppliableToDocument {
    applyTo<DocumentType extends DocumentWithNonDestructiveOperations<any, any>>(document: DocumentType): DocumentType;
}

export type ChangelogWithNonDestructiveOperations<
    StatementType extends Statement = Statement,
> = ChangelogNonDestructiveOperations<StatementType> & 
    ChangelogAppliableToDocument;

export type ChangelogWithDestructiveOperations<
    StatementType extends Statement = Statement,
> = ChangelogNonDestructiveOperations<StatementType> & 
    ChangelogDestructiveOperations<StatementType> & 
    ChangelogAppliableToDocument;

export type Changelog<
    StatementType extends Statement = Statement,
> = ChangelogWithDestructiveOperations<StatementType>;