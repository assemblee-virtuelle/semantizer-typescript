import { Resource } from "../core/Common";
import { Constructed, ContainedThingOf, Document, DocumentWithDestructiveOperationsConstructor, StatementOf } from "../core/Document";
import { Statement } from "../core/Statement";
import { ThingWithNonDestructiveOperations } from "../core/Thing";
import { Changelog, WithChangelog } from "./Changelog";
import { ChangelogImpl } from "./ChangelogImpl.js";

export function DocumentWithChangelogMixin<
    TBase extends DocumentWithDestructiveOperationsConstructor<any, any>
>(Base: TBase) {
    return class DocumentWithChangelogImpl extends Base implements WithChangelog {

        _changelog: ChangelogImpl; // TODO: add statement type?

        public constructor(...args: any[]) { 
            super(...args);
            this._changelog = new ChangelogImpl();
        }

        public createStatement(about: string | Resource, property: string, value: string, datatype?: string, language?: string): StatementOf<ContainedThingOf<Constructed<TBase>>> {
            const statement = super.createStatement(about, property, value, datatype, language);
            this._changelog.registerAdded(statement);
            return statement as StatementOf<ContainedThingOf<Constructed<TBase>>>;
        }

        public getChangelog(): Changelog {
            return this._changelog;
        }
    }
}