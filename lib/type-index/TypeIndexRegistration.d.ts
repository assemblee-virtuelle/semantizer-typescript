import { ThingWithNonDestructiveOperations, Thing } from "../core/Thing";
import { TypeIndexStatement } from "./TypeIndex";
export interface WithReadOperations {
    isForClass(forClass: string): boolean;
    toString(): string;
    getInstanceAll(): string[];
    getInstanceContainerAll(): string[];
    getInstanceAndInstanceContainerAll(): string[];
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
export type TypeIndexRegistrationReadonly = ThingWithNonDestructiveOperations<TypeIndexStatement> & WithReadOperations;
export type TypeIndexRegistration = Thing<TypeIndexStatement> & WithReadOperations & WithWriteOperations;
//# sourceMappingURL=TypeIndexRegistration.d.ts.map