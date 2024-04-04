import ThingDefaultImpl from "../core-default/ThingDefaultImpl";
import Resource from "../core/Resource";
import TypeIndex from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
export declare class TypeIndexRegistrationDefaultImpl extends ThingDefaultImpl implements TypeIndexRegistration {
    constructor(document: TypeIndex, uri?: string);
    isForClass(forClass: string): boolean;
    protected getUriFromStringOrResource(stringOrResource: string | Resource): string;
    protected getFirstElementOrNull(collection: string[]): string | null;
    addForClass(forClass: string | Resource): TypeIndexRegistration;
    addInstance(instance: string | Resource): TypeIndexRegistration;
    addInstanceContainer(instanceContainer: string | Resource): TypeIndexRegistration;
    getForClass(): string | null;
    getForClassAll(): string[];
    getInstance(): string | null;
    getInstanceAll(): string[];
    getInstanceContainer(): string | null;
    getInstanceContainerAll(): string[];
    setForClass(forClass: string): TypeIndexRegistration;
    removeForClass(forClass: string): TypeIndexRegistration;
    removeInstance(instance: string): TypeIndexRegistration;
    removeInstanceContainer(instanceContainer: string): TypeIndexRegistration;
    removeForClassAll(): TypeIndexRegistration;
    removeInstanceAll(): TypeIndexRegistration;
    removeInstanceContainerAll(): TypeIndexRegistration;
}
export default TypeIndexRegistrationDefaultImpl;
//# sourceMappingURL=TypeIndexRegistrationDefaultImpl.d.ts.map