import { Thing, ThingWritable } from "../core/Thing";
import { TypeIndexStatement } from "./TypeIndex";
export interface WithReadOperations {
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
export type TypeIndexRegistrationReadonly = Thing<TypeIndexStatement> & WithReadOperations;
export type TypeIndexRegistration = ThingWritable<TypeIndexStatement> & WithReadOperations & WithWriteOperations;
//# sourceMappingURL=TypeIndexRegistration.d.ts.map