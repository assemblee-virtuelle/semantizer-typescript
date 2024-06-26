import {
    Document,
    DocumentWithNonDestructiveOperations,
    Statement,
    StatementWithNonDestructiveOperations,
    Thing,
    ThingWithNonDestructiveOperations
} from "@semantizer/types";

export interface TypeIndexNonDestructiveOperations {
    // getStatementForClass(registration: string | TypeIndexRegistration): TypeIndexStatement | undefined;
    // getStatementForInstance(registration: string | TypeIndexRegistration): TypeIndexStatement | undefined;
    // getStatementForInstanceContainer(registration: string | TypeIndexRegistration): TypeIndexStatement | undefined;

    // getStatementAllForClass(registration: string | TypeIndexRegistration): TypeIndexStatement[];
    // getStatementAllForInstance(registration: string | TypeIndexRegistration): TypeIndexStatement[];
    // getStatementAllForInstanceContainer(registration: string | TypeIndexRegistration): TypeIndexStatement[];

    getForClassAll(): string[];

    getRegistrationAllForClass(forClass: string): TypeIndexRegistration[];
    getRegistrationAllForInstance(instance: string): TypeIndexRegistration[];
    getRegistrationAllForInstanceContainer(instanceContainer: string): TypeIndexRegistration[];

    // Add other forEach like: forEachOfInstance, forEachOfInstanceContainer?
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void;
}

export interface TypeIndexDestructiveOperations {
    createRegistration(): TypeIndexRegistration;
    createRegistrationForInstance(forClass: string, instance: string, nameHintOrUri?: string): TypeIndexRegistration;
    createRegistrationForInstanceContainer(forClass: string, instanceContainer: string, nameHintOrUri?: string): TypeIndexRegistration;

    addForClassToRegistration(registration: string | TypeIndexRegistration, forClass: string): TypeIndexRegistration;
    addInstanceToRegistration(registration: string | TypeIndexRegistration, instance: string): TypeIndexRegistration;
    addInstanceContainerToRegistration(registration: string | TypeIndexRegistration, instanceContainer: string):  TypeIndexRegistration;
    
    setForClassOfRegistration(registration: string | TypeIndexRegistration, forClass: string, oldValue?: string): TypeIndexRegistration;
    setInstanceOfRegistration(registration: string | TypeIndexRegistration, instance: string, oldValue?: string): TypeIndexRegistration;
    setInstanceContainerOfRegistration(registration: string | TypeIndexRegistration, instanceContainer: string, oldValue?: string): TypeIndexRegistration;
    
    removeForClassOfRegistration(registration: string | TypeIndexRegistration, ...forClasses: string[]): TypeIndexRegistration;
    removeInstanceOfRegistration(registration: string | TypeIndexRegistration, ...instances: string[]): TypeIndexRegistration;
    removeInstanceContainerOfRegistration(registration: string | TypeIndexRegistration, ...instanceContainers: string[]): TypeIndexRegistration;
    
    removeForClassAllOfRegistration(registration: string | TypeIndexRegistration): TypeIndexRegistration;
    removeInstanceAllOfRegistration(registration: string | TypeIndexRegistration): TypeIndexRegistration;
    removeInstanceContainerAllOfRegistration(registration: string | TypeIndexRegistration): TypeIndexRegistration; 
}

export interface TypeIndexRegistrationNonDestructiveOperations {
    isForClass(forClass: string): boolean;
    toString(): string;

    getInstanceAll(): string[];
    getInstanceContainerAll(): string[];
    getInstanceAndInstanceContainerAll(): string[];
}

export interface TypeIndexRegistrationDestructiveOperations {
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

export interface TypeIndexStatementNonDestructiveOperations {
    isForClass(forClass: string): boolean;
    isForInstance(instance: string): boolean;
    isForInstanceContainer(instanceContainer: string): boolean;
}

export type TypeIndexStatementWithNonDestructiveOperations = StatementWithNonDestructiveOperations & TypeIndexStatementNonDestructiveOperations;
export type TypeIndexStatement = Statement & TypeIndexStatementNonDestructiveOperations;
export type TypeIndexRegistrationWithNonDestructiveOperations = ThingWithNonDestructiveOperations<TypeIndexStatement> & TypeIndexRegistrationNonDestructiveOperations;
export type TypeIndexRegistration = Thing<TypeIndexStatement> & TypeIndexRegistrationNonDestructiveOperations & TypeIndexRegistrationDestructiveOperations;
export type TypeIndexWithNonDestructiveOperations = DocumentWithNonDestructiveOperations<TypeIndexRegistrationWithNonDestructiveOperations> & TypeIndexNonDestructiveOperations;
export type TypeIndex = Document<TypeIndexRegistration, Thing<TypeIndexStatement>> & TypeIndexNonDestructiveOperations & TypeIndexDestructiveOperations;