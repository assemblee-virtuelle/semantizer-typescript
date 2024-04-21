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

        public createStatement(about: string, value: string): ThisType<this> {
            super.createStatement(about, value);
            //this._changelog.registerAdded()
            return this;
        }

        public getChangelog(): Changelog {
            return this._changelog;
        }
    }
}