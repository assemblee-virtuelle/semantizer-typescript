import { DocumentWritableConstructor } from "../core/Document";
import { Statement } from "../core/Statement";
import { Thing } from "../core/Thing";
import { Changelog, WithChangelog } from "./Changelog";
import { ChangelogImpl } from "./ChangelogImpl.js";

export function DocumentWithChangelogMixin<
    TBase extends DocumentWritableConstructor<any, any>
>(Base: TBase) {
    return class DocumentWithChangelogImpl extends Base implements WithChangelog {

        _changelog: ChangelogImpl; // TODO: add statement type?

        public constructor(...args: any[]) { 
            super(...args);
            this._changelog = new ChangelogImpl();
        }

        public createStatement(about: string | Thing, property: string, value: string, datatype?: string, language?: string): Statement | undefined {
            const statement = super.createStatement(about, property, value, datatype, language);
            if (statement) {
                this._changelog.registerAdded(statement);
                return statement;
            }
            return undefined;
        }

        public getChangelog(): Changelog {
            return this._changelog;
        }
    }
}