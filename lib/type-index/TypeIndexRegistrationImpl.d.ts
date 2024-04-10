import ThingImpl from "../core-default/ThingImpl";
import Resource from "../core/Resource";
import { Statement, StatementBase } from "../core/Statement";
import { TypeIndex } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";
export declare class TypeIndexRegistrationImpl<ContainedStatement extends StatementBase = Statement> extends ThingImpl<ContainedStatement> implements TypeIndexRegistration<ContainedStatement> {
    constructor(document: TypeIndex, uri?: string);
    isForClass(forClass: string): boolean;
    protected getUriFromStringOrResource(stringOrResource: string | Resource): string;
    protected getFirstElementOrNull(collection: string[]): string | null;
    addForClass(forClass: string | Resource): this;
    addInstance(instance: string | Resource): this;
    addInstanceContainer(instanceContainer: string | Resource): this;
    getForClass(): string | null;
    getForClassAll(): string[];
    getInstance(): string | null;
    getInstanceAll(): string[];
    getInstanceContainer(): string | null;
    getInstanceContainerAll(): string[];
    setForClass(forClass: string): this;
    removeForClass(forClass: string): this;
    removeInstance(instance: string): this;
    removeInstanceContainer(instanceContainer: string): this;
    removeForClassAll(): this;
    removeInstanceAll(): this;
    removeInstanceContainerAll(): this;
}
export default TypeIndexRegistrationImpl;
//# sourceMappingURL=TypeIndexRegistrationImpl.d.ts.map