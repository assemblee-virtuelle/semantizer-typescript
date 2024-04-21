import { Changelog, WithChangelog } from "../changelog/Changelog.js";
import DocumentDecoratedImpl from "../core/Decorated.js";
import { DocumentWritable, DocumentWritableConstructor, Statement } from "../core/Document";
import { LocalDocument } from "../synchronized/DocumentSynchronized.js";
import { DocumentLocalConstructor } from "../synchronized/DocumentSynchronizedImpl.js";
import { TypeIndexStatement, WithReadOperations, WithWriteOperations } from "./TypeIndex";
export declare class TypeIndexImpl extends DocumentDecoratedImpl<TypeIndexStatement> implements WithReadOperations, WithWriteOperations {
    getStatementForClass(forClass: string): TypeIndexStatement[];
    getStatementForInstance(instance: string): TypeIndexStatement[];
    getStatementForInstanceContainer(instanceContainer: string): TypeIndexStatement[];
    addForClass(forClass: string): this;
    addInstance(instance: string): this;
    addInstanceContainer(instanceContainer: string): this;
    setForClass(forClass: string): this;
    removeForClass(forClass: string): this;
    removeInstance(instance: string): this;
    removeInstanceContainer(instanceContainer: string): this;
    removeForClassAll(): this;
    removeInstanceAll(): this;
    removeInstanceContainerAll(): this;
    forEachOfClass(forClass: string, callbackfn: (value: Statement, index?: number, array?: Statement[]) => void, thisArg?: any): void;
    createRegistration(forClass?: string, nameHintOrUri?: string | undefined): this;
}
export declare function SyncrhonizedMixin<TBase extends DocumentWritableConstructor<any, any>>(Base: TBase): typeof TypeIndexImpl;
export declare class TypeIndexLocalImpl extends TypeIndexImpl implements WithChangelog, LocalDocument {
    private _localDocument;
    constructor(wrapped: DocumentWritable<TypeIndexStatement> & LocalDocument);
    getChangelog(): Changelog<Statement>;
    saveUpdate(): Promise<void>;
    saveNew(uri: string): Promise<void>;
    saveOverwrite(): Promise<void>;
    isLocal(): boolean;
    isDistant(): boolean;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
}
export declare function TypeIndexMixin<TBase extends DocumentWritableConstructor<any, any>>(Base: TBase): typeof TypeIndexImpl;
export declare function TypeIndexLocalMixin<TBase extends DocumentLocalConstructor<any, any>>(Base: TBase): typeof TypeIndexLocalImpl;
//# sourceMappingURL=TypeIndexImpl.d.ts.map