import { DocumentWithNonDestructiveOperations, Document } from "../core/Document";
import { Statement, StatementWithDestructiveOperations } from "../core/Statement";
import { ThingWithNonDestructiveOperations, Thing } from "../core/Thing";
export interface TypeIndexNonDestructiveOperations {
    getForClassAll(): string[];
    getRegistrationAllForClass(forClass: string): TypeIndexRegistration[];
    getRegistrationAllForInstance(instance: string): TypeIndexRegistration[];
    getRegistrationAllForInstanceContainer(instanceContainer: string): TypeIndexRegistration[];
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void;
}
export interface TypeIndexDestructiveOperations {
    createRegistration(): TypeIndexRegistration;
    createRegistrationForInstance(forClass: string, instance: string, nameHintOrUri?: string): TypeIndexRegistration;
    createRegistrationForInstanceContainer(forClass: string, instanceContainer: string, nameHintOrUri?: string): TypeIndexRegistration;
    addForClassToRegistration(registration: string | TypeIndexRegistration, forClass: string): TypeIndexRegistration;
    addInstanceToRegistration(registration: string | TypeIndexRegistration, instance: string): TypeIndexRegistration;
    addInstanceContainerToRegistration(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexRegistration;
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
export type TypeIndexStatementWithNonDestructiveOperations = StatementWithDestructiveOperations & TypeIndexStatementNonDestructiveOperations;
export type TypeIndexStatement = Statement & TypeIndexStatementNonDestructiveOperations;
export type TypeIndexRegistrationWithNonDestructiveOperations = ThingWithNonDestructiveOperations<TypeIndexStatement> & TypeIndexRegistrationNonDestructiveOperations;
export type TypeIndexRegistration = Thing<TypeIndexStatement> & TypeIndexRegistrationNonDestructiveOperations & TypeIndexRegistrationDestructiveOperations;
export type TypeIndex = DocumentWithNonDestructiveOperations<TypeIndexRegistration> & TypeIndexNonDestructiveOperations;
export type TypeIndexWritable = Document<TypeIndexRegistration, Thing<TypeIndexStatement>> & TypeIndexNonDestructiveOperations & TypeIndexDestructiveOperations;
//# sourceMappingURL=types.d.ts.map