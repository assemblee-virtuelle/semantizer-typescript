import Resource from "./Resource";
import Thing from "./Thing";
import ThingDefaultImpl, { StateType } from "./ThingDefaultImpl";
import TypeIndexRegistration from "./TypeIndexRegistration";

export class TypeIndexRegistrationDefaultImpl extends ThingDefaultImpl implements TypeIndexRegistration {

    private _forClass: string[];
    private _instance: string[];
    private _instanceContainer: string[];

    constructor(thing: Thing) {
        super(thing.getDocument(), StateType.Regular, thing.getUri());
        this._forClass = [];
        this._instance = [];
        this._instanceContainer = [];
    }

    // TODO : move to utils class ?
    protected getUriFromStringOrResource(stringOrResource: string | Resource): string {
        return typeof stringOrResource === 'string'? stringOrResource: stringOrResource.getUri();
    }

    protected getFirstElementOrNull(collection: string[]): string | null {
        return collection.length > 0? collection[0]: null;
    }

    private _getForClass(): string[] {
        return this._forClass;
    }

    private _getInstance(): string[] {
        return this._instance;
    }

    private _getInstanceContainer(): string[] {
        return this._instanceContainer;
    }

    public addForClass(forClass: string | Resource): TypeIndexRegistration {
        this._getForClass().push(this.getUriFromStringOrResource(forClass));
        return this;
    }

    public addInstance(instance: string | Resource): TypeIndexRegistration {
        this._getInstance().push(this.getUriFromStringOrResource(instance));
        return this;
    }

    public addInstanceContainer(instanceContainer: string | Resource): TypeIndexRegistration {
        this._getInstanceContainer().push(this.getUriFromStringOrResource(instanceContainer));
        return this;
    }

    public getForClass(): string | null {
        return this.getFirstElementOrNull(this._getForClass());
    }

    public getForClassAll(): string[] {
        return this._getForClass(); // TODO: return copy
    }

    public getInstance(): string | null {
        return this.getFirstElementOrNull(this._getInstance());
    }

    public getInstanceAll(): string[] {
        return this._getInstance(); // TODO: return copy
    }

    public getInstanceContainer(): string | null {
        return this.getFirstElementOrNull(this._getInstanceContainer());
    }

    public getInstanceContainerAll(): string[] {
        return this._getInstanceContainer(); // TODO: return copy
    }
    
}