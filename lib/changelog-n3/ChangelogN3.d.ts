import { Changelog, WithChangelog } from "../changelog/Changelog";
import { DocumentWritable } from "../core/Document";
import { Statement } from "../core/Statement";
import { Thing } from "../core/Thing";
import { N3Serializable } from "../core/Serializable";
export type ChangelogN3<StatementType extends Statement = Statement> = Changelog<StatementType> & N3Serializable;
export type DocumentWithChangelogN3Constructor<ContainedThing extends Thing<any> = Thing, SelfDescribingThing extends Thing<any> = Thing> = new (...args: any[]) => DocumentWritable<ContainedThing, SelfDescribingThing> & WithChangelogN3;
export interface WithChangelogN3<StatementType extends Statement = Statement> extends WithChangelog<StatementType> {
    getChangelogN3(): ChangelogN3;
}
//# sourceMappingURL=ChangelogN3.d.ts.map