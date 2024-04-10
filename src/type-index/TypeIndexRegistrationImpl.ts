import ThingImpl, { ThingType } from "../core-default/ThingImpl";
import Resource from "../core/Resource";
import { TypeIndex } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";

type TypeIndexRegistrationThing = TypeIndexRegistration<TypeIndexDocument>;
type TypeIndexDocument = TypeIndex<TypeIndexRegistrationThing, TypeIndexRegistrationThing>;

export class TypeIndexRegistrationImpl
extends ThingImpl<TypeIndexDocument> //ContainedStatement> 
implements TypeIndexRegistration<TypeIndexDocument> {

    constructor(document: TypeIndexDocument, uri?: string) {
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

    public addForClass(forClass: string | Resource): this {
        //this.add("solid:forClass", this.getUriFromStringOrResource(forClass));
        return this;
    }

    public addInstance(instance: string | Resource): this {
        //this.add("solid:instance", this.getUriFromStringOrResource(instance));
        return this;
    }

    public addInstanceContainer(instanceContainer: string | Resource): this {
        //this.add("solid:instanceContainer", this.getUriFromStringOrResource(instanceContainer));
        return this;
    }

    public getForClass(): string | null {
        return this.getFirstElementOrNull(this.getForClassAll());
    }

    public getForClassAll(): string[] {
        return []// this.getAll("solid:forClass");
    }

    public getInstance(): string | null {
        return this.getFirstElementOrNull(this.getInstanceAll());
    }

    public getInstanceAll(): string[] {
        return []// this.getAll("solid:instance");
    }

    public getInstanceContainer(): string | null {
        return this.getFirstElementOrNull(this.getInstanceContainerAll());
    }

    public getInstanceContainerAll(): string[] {
        return []// this.getAll("solid:instanceContainer");
    }

    public setForClass(forClass: string): this {
        throw new Error();
    }
 
    public removeForClass(forClass: string): this {
        this.remove("solid:forClass", forClass);
        return this;
    }

    public removeInstance(instance: string): this {
        this.remove("solid:forClass", instance);
        return this;
    }

    public removeInstanceContainer(instanceContainer: string): this {
        this.remove("solid:forClass", instanceContainer);
        return this;
    }

    public removeForClassAll(): this {
        this.removeAll("solid:forClass");
        return this;
    }

    public removeInstanceAll(): this {
        this.removeAll("solid:instance");
        return this;
    }

    public removeInstanceContainerAll(): this {
        this.removeAll("solid:instanceContainer");
        return this;
    }

}

export default TypeIndexRegistrationImpl;