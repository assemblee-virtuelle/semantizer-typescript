import { Thing } from "../core/Thing";
import { TypeIndexStatement } from "./TypeIndex";

export interface TypeIndexRegistrationReadonly extends Thing<TypeIndexStatement> {
    isForClass(forClass: string): boolean;
}

export interface WithWriteOperations {
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

export type TypeIndexRegistration = TypeIndexRegistrationReadonly & WithWriteOperations;