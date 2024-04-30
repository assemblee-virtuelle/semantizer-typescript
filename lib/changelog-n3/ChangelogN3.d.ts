import { Changelog, WithChangelog } from "../changelog/Changelog";
import { Document } from "../core/Document";
import { Statement } from "../core/Statement";
import { ThingWithNonDestructiveOperations } from "../core/Thing";
import { N3Serializable } from "../core/Serializable";
export type ChangelogN3<StatementType extends Statement = Statement> = Changelog<StatementType> & N3Serializable;
export type DocumentWithChangelogN3Constructor<ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations, SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations> = new (...args: any[]) => Document<ContainedThing, SelfDescribingThing> & WithChangelogN3;
export interface WithChangelogN3<StatementType extends Statement = Statement> extends WithChangelog<StatementType> {
    getChangelogN3(): ChangelogN3;
}
//# sourceMappingURL=ChangelogN3.d.ts.map