import { Document, DocumentWritable } from "../core/Document";
import { Statement } from "../core/Statement";
import { Thing, ThingWritable } from "../core/Thing";
import { TypeIndexRegistration } from "./TypeIndexRegistration";



export interface TypeIndexStatement extends Statement {
    isForClass(forClass: string): boolean;
    isForInstance(instance: string): boolean;
    isForInstanceContainer(instanceContainer: string): boolean;
}

export interface WithReadOperations {
    getStatementForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexStatement | undefined;
    getStatementForInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexStatement | undefined;
    getStatementForInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexStatement | undefined;

    getStatementAllForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexStatement[];
    getStatementAllForInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexStatement[];
    getStatementAllForInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexStatement[];

    // Add other forEach like: forEachOfInstance, forEachOfInstanceContainer?
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void;
}

export interface WithWriteOperations {
    createRegistration(): TypeIndexRegistration;
    createRegistrationForInstance(forClass: string, instance: string, nameHintOrUri?: string): TypeIndexRegistration;
    createRegistrationForInstanceContainer(forClass: string, instanceContainer: string, nameHintOrUri?: string): TypeIndexRegistration;

    addForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexRegistration;
    addInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexRegistration;
    addInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string):  TypeIndexRegistration;
    
    setForClass(registration: string | TypeIndexRegistration, forClass: string, oldValue?: string): TypeIndexRegistration;
    setInstance(registration: string | TypeIndexRegistration, instance: string, oldValue?: string): TypeIndexRegistration;
    setInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string, oldValue?: string): TypeIndexRegistration;
    
    removeForClass(registration: string | TypeIndexRegistration, ...forClass: string[]): TypeIndexRegistration;
    removeInstance(registration: string | TypeIndexRegistration, ...instance: string[]): TypeIndexRegistration;
    removeInstanceContainer(registration: string | TypeIndexRegistration, ...instanceContainer: string[]): TypeIndexRegistration;
    
    removeForClassAll(registration: string | TypeIndexRegistration): TypeIndexRegistration;
    removeInstanceAll(registration: string | TypeIndexRegistration): TypeIndexRegistration;
    removeInstanceContainerAll(registration: string | TypeIndexRegistration): TypeIndexRegistration; 
}

export type TypeIndex = Document<TypeIndexRegistration> & WithReadOperations;
export type TypeIndexWritable = DocumentWritable<TypeIndexRegistration, ThingWritable<TypeIndexStatement>> & WithReadOperations & WithWriteOperations;