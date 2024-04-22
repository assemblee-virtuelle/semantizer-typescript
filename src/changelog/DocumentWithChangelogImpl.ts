import { DocumentWritableConstructor } from "../core/Document";
import { Changelog, WithChangelog } from "./Changelog";
import { ChangelogImpl } from "./ChangelogImpl.js";

export function DocumentWithChangelogMixin<
    TBase extends DocumentWritableConstructor<any, any>
>(Base: TBase) {
    return class DocumentWithChangelogImpl extends Base implements WithChangelog {

        _changelog: ChangelogImpl;

        public constructor(...args: any[]) { 
            super();
            this._changelog = new ChangelogImpl();
        }

        public createStatement(about: string, property: string, value: string, datatype?: string, language?: string): ThisType<this> {
            const statement = super.createStatement(about, property, value, datatype, language);
            this._changelog.registerAdded(statement);
            return statement;
        }

        public getChangelog(): Changelog {
            return this._changelog;
        }
    }
}