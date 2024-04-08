import Resource from "../core/Resource";
import ThingBase, { Thing, ThingReadonly } from "../core/Thing";

export interface TypeIndexRegistrationBase { // extends ThingBase {
    isForClass(forClass: string): boolean;
    getForClass(): string | null;
    getForClassAll(): string[];
    getInstance(): string | null;
    getInstanceAll(): string[];
    getInstanceContainer(): string | null;
    getInstanceContainerAll(): string[];
}

export interface WithReadOperations {

}

export interface WithWriteOperations {
    addForClass(forClass: string | Resource): TypeIndexRegistration;
    addInstance(instance: string | Resource): TypeIndexRegistration;
    addInstanceContainer(instanceContainer: string | Resource): TypeIndexRegistration;
    setForClass(forClass: string): TypeIndexRegistration;
    removeForClass(forClass: string): TypeIndexRegistration;
    removeInstance(instance: string): TypeIndexRegistration;
    removeInstanceContainer(instanceContainer: string): TypeIndexRegistration;
    removeForClassAll(): TypeIndexRegistration;
    removeInstanceAll(): TypeIndexRegistration;
    removeInstanceContainerAll(): TypeIndexRegistration; 
}

export type TypeIndexRegistrationReadonly = TypeIndexRegistrationBase & ThingReadonly & WithReadOperations;
export type TypeIndexRegistration = TypeIndexRegistrationBase & Thing & WithReadOperations & WithWriteOperations;
export default TypeIndexRegistration;