import { Document, DocumentWritable, Statement } from "../core/Document";

export interface TypeIndexStatement extends Statement {
    isForClass(forClass: string): boolean;
}

export interface WithReadOperations {
    getStatementForClass(forClass: string): TypeIndexStatement[];
    getStatementForInstance(instance: string): TypeIndexStatement[];
    getStatementForInstanceContainer(instanceContainer: string): TypeIndexStatement[];

    // Add other forEach like: forEachOfInstance, forEachOfInstanceContainer?
    forEachOfClass(forClass: string, callbackfn: (value: Statement, index?: number, array?: Statement[]) => void, thisArg?: any): void;
}

export interface WithWriteOperations {
    createRegistration(forClass?: string, nameHintOrUri?: string): ThisType<this>;

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
}

export type TypeIndex = Document<TypeIndexStatement> & WithReadOperations;
export type TypeIndexWritable = DocumentWritable<TypeIndexStatement> & WithReadOperations & WithWriteOperations;