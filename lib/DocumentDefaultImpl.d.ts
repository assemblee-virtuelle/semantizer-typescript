import { Document } from "./Document";
import DatasetExt from "rdf-ext/lib/Dataset";
import Thing from "./Thing";
import Resource from "./Resource";
import Context from "./Context";
export declare class DocumentDefaultImpl implements Document {
    private _uri;
    private _things;
    private _context?;
    constructor(uri?: string, context?: Context);
    setContext(context: Context): void;
    getContext(): Context | undefined;
    expand(uri: string): string;
    shorten(uri: string): string;
    addThing(thing: Thing): Document;
    addDocument(document: Document): Document;
    getThing(uri: string): Thing | null;
    protected isUrl(input: string): boolean;
    protected generateUriWithFragment(): string;
    protected getOrCreateNameWithHash(nameWithOrWithoutHash: string): string;
    protected createUriWithFragment(name: string): string;
    protected checkUriCanBeAddedToTheDocument(uri: string): boolean;
    protected getSafeUriFromUri(uri: string): string;
    protected getSafeUriFromName(name: string): string;
    protected getSafeUriFromNameHintOrUri(nameHintOrUri: string): string;
    createSelfDescribingThing(): Thing;
    generateThingName(): string;
    protected validateOrCreateThingUri(nameHintOrUri?: string): string;
    protected createAndAddRegularThing(uri: string): Thing;
    createThing(nameHintOrUri?: string): Thing;
    createAnonymousThing(nameHint?: string): Thing;
    deleteThing(): void;
    getUri(): string;
    setUri(uri: string): void;
    isEmpty(): boolean;
    getAllThings(): Thing[];
    getSelfDescribingThing(): Thing | null;
    countThings(): number;
    hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean;
    filter(by: (subject?: string | Resource, property?: string, value?: string) => boolean): Thing;
    toRdfDatasetExt(): DatasetExt;
}
export default DocumentDefaultImpl;
//# sourceMappingURL=DocumentDefaultImpl.d.ts.map