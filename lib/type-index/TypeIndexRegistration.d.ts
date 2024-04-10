import Resource from "../core/Resource";
import { Statement, StatementBase, StatementReadonly } from "../core/Statement";
import { ThingBase, ThingReadonly } from "../core/Thing";
export interface TypeIndexRegistrationBase {
    isForClass(forClass: string): boolean;
    getForClass(): string | null;
    getForClassAll(): string[];
    getInstance(): string | null;
    getInstanceAll(): string[];
    getInstanceContainer(): string | null;
    getInstanceContainerAll(): string[];
}
export interface WithWriteOperations {
    addForClass(forClass: string | Resource): this;
    addInstance(instance: string | Resource): this;
    addInstanceContainer(instanceContainer: string | Resource): this;
    setForClass(forClass: string): this;
    removeForClass(forClass: string): this;
    removeInstance(instance: string): this;
    removeInstanceContainer(instanceContainer: string): this;
    removeForClassAll(): this;
    removeInstanceAll(): this;
    removeInstanceContainerAll(): this;
}
export interface TypeIndexRegistration<ContainedStatement extends StatementBase = Statement> extends ThingBase<ContainedStatement>, TypeIndexRegistrationBase, WithWriteOperations {
}
export interface TypeIndexRegistrationReadonly<ContainedStatement extends StatementReadonly = StatementReadonly> extends ThingReadonly<ContainedStatement>, TypeIndexRegistrationBase {
}
//# sourceMappingURL=TypeIndexRegistration.d.ts.map