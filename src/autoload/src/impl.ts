import { DocumentWithDestructiveOperationsConstructor, Resource, StatementOf, Thing } from "@semantizer/types";

export function AutoloadMixin<
    TBase extends DocumentWithDestructiveOperationsConstructor<Thing, Thing>
>(Base: TBase) {

    return class AutoloadMixinImpl extends Base {

        _loaded: boolean;

        public constructor(...args: any[]) {
            super(...args);
            this._loaded = false;
        }

        public isLoaded(): boolean {
            return this._loaded;
        }

        async _autoload(): Promise<void> {
            if (!this.isLoaded()) {
                // await loader.load()...
            }
        }

        public async getStatementAutoload(about: string | Resource, property: string, language?: string | undefined): Promise<StatementOf<Thing>> {
            await this._autoload();
            return this.getStatement(about, property, language);
        }

    }

}