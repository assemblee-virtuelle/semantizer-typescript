import { DocumentWithNonDestructiveOperations, Document } from "../core/Document";
import { Statement } from "../core/Statement";
import { Thing } from "../core/Thing";
import { TypeIndexRegistration } from "./TypeIndexRegistration";
export interface TypeIndexStatement extends Statement {
    isForClass(forClass: string): boolean;
    isForInstance(instance: string): boolean;
    isForInstanceContainer(instanceContainer: string): boolean;
}
export interface WithReadOperations {
    getForClassAll(): string[];
    getRegistrationAllForClass(forClass: string): TypeIndexRegistration[];
    getRegistrationAllForInstance(instance: string): TypeIndexRegistration[];
    getRegistrationAllForInstanceContainer(instanceContainer: string): TypeIndexRegistration[];
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void;
}
export interface WithWriteOperations {
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
export type TypeIndex = DocumentWithNonDestructiveOperations<TypeIndexRegistration> & WithReadOperations;
export type TypeIndexWritable = Document<TypeIndexRegistration, Thing<TypeIndexStatement>> & WithReadOperations & WithWriteOperations;
//# sourceMappingURL=TypeIndex.d.ts.map