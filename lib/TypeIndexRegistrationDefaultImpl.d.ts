import Resource from "./Resource";
import Thing from "./Thing";
import ThingDefaultImpl from "./ThingDefaultImpl";
import TypeIndexRegistration from "./TypeIndexRegistration";
export declare class TypeIndexRegistrationDefaultImpl extends ThingDefaultImpl implements TypeIndexRegistration {
    private _forClass;
    private _instance;
    private _instanceContainer;
    constructor(thing: Thing);
    protected getUriFromStringOrResource(stringOrResource: string | Resource): string;
    protected getFirstElementOrNull(collection: string[]): string | null;
    private _getForClass;
    private _getInstance;
    private _getInstanceContainer;
    addForClass(forClass: string | Resource): TypeIndexRegistration;
    addInstance(instance: string | Resource): TypeIndexRegistration;
    addInstanceContainer(instanceContainer: string | Resource): TypeIndexRegistration;
    getForClass(): string | null;
    getForClassAll(): string[];
    getInstance(): string | null;
    getInstanceAll(): string[];
    getInstanceContainer(): string | null;
    getInstanceContainerAll(): string[];
}
//# sourceMappingURL=TypeIndexRegistrationDefaultImpl.d.ts.map