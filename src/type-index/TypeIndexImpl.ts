import { Changelog, WithChangelog } from "../changelog/Changelog.js";
import DocumentDecoratedImpl from "../core/Decorated.js";
import { DocumentWritable, DocumentWritableConstructor, Statement } from "../core/Document";
import { LocalDocument } from "../synchronized/DocumentSynchronized.js";
import { DocumentLocalConstructor } from "../synchronized/DocumentSynchronizedImpl.js";
import { TypeIndexStatement, WithReadOperations, WithWriteOperations } from "./TypeIndex";

export class TypeIndexImpl 
extends DocumentDecoratedImpl<TypeIndexStatement> 
implements WithReadOperations, WithWriteOperations {

    getStatementForClass(forClass: string): TypeIndexStatement[] {
        throw new Error("Method not implemented.");
    }
    getStatementForInstance(instance: string): TypeIndexStatement[] {
        throw new Error("Method not implemented.");
    }
    getStatementForInstanceContainer(instanceContainer: string): TypeIndexStatement[] {
        throw new Error("Method not implemented.");
    }
    addForClass(forClass: string): this {
        throw new Error("Method not implemented.");
    }
    addInstance(instance: string): this {
        throw new Error("Method not implemented.");
    }
    addInstanceContainer(instanceContainer: string): this {
        throw new Error("Method not implemented.");
    }
    setForClass(forClass: string): this {
        throw new Error("Method not implemented.");
    }
    removeForClass(forClass: string): this {
        throw new Error("Method not implemented.");
    }
    removeInstance(instance: string): this {
        throw new Error("Method not implemented.");
    }
    removeInstanceContainer(instanceContainer: string): this {
        throw new Error("Method not implemented.");
    }
    removeForClassAll(): this {
        throw new Error("Method not implemented.");
    }
    removeInstanceAll(): this {
        throw new Error("Method not implemented.");
    }
    removeInstanceContainerAll(): this {
        throw new Error("Method not implemented.");
    }
    
    public forEachOfClass(forClass: string, callbackfn: (value: Statement, index?: number, array?: Statement[]) => void, thisArg?: any): void {
        this.forEach((s, i, a) => s.isForClass(forClass)? callbackfn(s, i, a): null, thisArg);
    }

    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): this {
        // const registration = this.createThingWithUri(nameHintOrUri);
        // if (forClass)
        //     registration.addForClass(forClass);
        // return registration;
        return this;
    }

}

export function SyncrhonizedMixin<TBase extends DocumentWritableConstructor<any, any>>(Base: TBase) {
    return TypeIndexImpl;
}

export class TypeIndexLocalImpl 
extends TypeIndexImpl 
implements WithChangelog, LocalDocument {

    private _localDocument: DocumentWritable<TypeIndexStatement> & LocalDocument;

    public constructor(wrapped: DocumentWritable<TypeIndexStatement> & LocalDocument) {
        super(wrapped);
        this._localDocument = wrapped;
    }

    public getChangelog(): Changelog<Statement> {
        throw new Error("Method not implemented.");
    }

    public async saveUpdate(): Promise<void> {
        console.log("saveUpdate in TypeIndexLocalImpl")
        this._localDocument.saveUpdate();
    }
    
    public async saveNew(uri: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    public async saveOverwrite(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    public isLocal(): boolean {
        throw new Error("Method not implemented.");
    }
    
    public isDistant(): boolean {
        throw new Error("Method not implemented.");
    }
    
    public getDistantUri(): string | undefined {
        throw new Error("Method not implemented.");
    }
    
    public getDistantUriAll(): string[] {
        throw new Error("Method not implemented.");
    }

}

export function TypeIndexMixin<TBase extends DocumentWritableConstructor<any, any>>(Base: TBase) {
    return TypeIndexImpl;
}

export function TypeIndexLocalMixin<TBase extends DocumentLocalConstructor<any, any>>(Base: TBase) {
    return TypeIndexLocalImpl;
}

// export function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
//     return TypeIndexImpl;
// }

// export function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
//     return TypeIndexImplReadOrWrite;
// }