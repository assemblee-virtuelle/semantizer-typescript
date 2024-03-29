import Resource from "../common/Resource";
import Thing from "../thing/Thing";
import ThingDefaultImpl, { ThingType } from "../thing/ThingDefaultImpl";
import TypeIndex from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";

export class TypeIndexRegistrationDefaultImpl extends ThingDefaultImpl implements TypeIndexRegistration {

    constructor(document: TypeIndex, uri?: string) {
        super(document, ThingType.Regular, uri);
    }

    public isForClass(forClass: string): boolean {
        return this.getForClassAll().includes(forClass);
    }

    // TODO : move to utils class ?
    protected getUriFromStringOrResource(stringOrResource: string | Resource): string {
        return typeof stringOrResource === 'string'? stringOrResource: stringOrResource.getUri();
    }

    protected getFirstElementOrNull(collection: string[]): string | null {
        return collection.length > 0? collection[0]: null;
    }

    public addForClass(forClass: string | Resource): TypeIndexRegistration {
        this.addStatement("solid:forClass", this.getUriFromStringOrResource(forClass));
        return this;
    }

    public addInstance(instance: string | Resource): TypeIndexRegistration {
        this.addStatement("solid:instance", this.getUriFromStringOrResource(instance));
        return this;
    }

    public addInstanceContainer(instanceContainer: string | Resource): TypeIndexRegistration {
        this.addStatement("solid:instanceContainer", this.getUriFromStringOrResource(instanceContainer));
        return this;
    }

    public getForClass(): string | null {
        return this.getFirstElementOrNull(this.getForClassAll());
    }

    public getForClassAll(): string[] {
        return this.getAllValuesAboutStatement("solid:forClass");
    }

    public getInstance(): string | null {
        return this.getFirstElementOrNull(this.getInstanceAll());
    }

    public getInstanceAll(): string[] {
        return this.getAllValuesAboutStatement("solid:instance");
    }

    public getInstanceContainer(): string | null {
        return this.getFirstElementOrNull(this.getInstanceContainerAll());
    }

    public getInstanceContainerAll(): string[] {
        return this.getAllValuesAboutStatement("solid:instanceContainer");
    }

    public setForClass(forClass: string): TypeIndexRegistration {
        throw new Error();
    }
 
    public removeForClass(forClass: string): TypeIndexRegistration {
        this.removeStatement("solid:forClass", forClass);
        return this;
    }

    public removeInstance(instance: string): TypeIndexRegistration {
        this.removeStatement("solid:forClass", instance);
        return this;
    }

    public removeInstanceContainer(instanceContainer: string): TypeIndexRegistration {
        this.removeStatement("solid:forClass", instanceContainer);
        return this;
    }

    public removeForClassAll(): TypeIndexRegistration {
        this.removeAllStatements("solid:forClass");
        return this;
    }

    public removeInstanceAll(): TypeIndexRegistration {
        this.removeAllStatements("solid:instance");
        return this;
    }

    public removeInstanceContainerAll(): TypeIndexRegistration {
        this.removeAllStatements("solid:instanceContainer");
        return this;
    }

}