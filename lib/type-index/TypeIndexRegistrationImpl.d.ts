import ThingImpl from "../core-default/ThingImpl";
import Resource from "../core/Resource";
import { TypeIndexDocument, TypeIndexRegistrationThing } from "./TypeIndex";
export declare class TypeIndexRegistrationImpl extends ThingImpl<TypeIndexDocument>//ContainedStatement> 
 implements TypeIndexRegistrationThing {
    constructor(document: TypeIndexDocument, uri?: string);
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