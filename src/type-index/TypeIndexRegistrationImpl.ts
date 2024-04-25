import { Statement, StatementConstructor } from "../core/Statement";
import { ThingConstructor, ThingWritable } from "../core/Thing";
import { TypeIndexStatement } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";
import { TypeIndexRegistrationStatementMixin } from "./TypeIndexRegistrationStatement.js";
import { TYPE_INDEX } from "./Vocabulary.js";

export function TypeIndexRegistrationMixin<
    TStatementImpl extends StatementConstructor<Statement>,
    TBase extends ThingConstructor<ThingWritable<TypeIndexStatement>>
>(Base: TBase, StatementImpl: TStatementImpl) {
    return class TypeIndexRegistrationImpl extends Base implements TypeIndexRegistration {

        // constructor(document: TypeIndex, uri?: string) {
            // super(document); //, ThingType.Regular, uri);
        // }

        public toString() : string {
            return `TypeIndexRegistration <${this.getUri()}>`;
        }

        public constructor(...args: any[]) {
            super(TypeIndexRegistrationStatementMixin(StatementImpl), ...args); 
        }

        public isForClass(forClass: string): boolean {
            return this.getForClassAll().includes(forClass);
        }

        // TODO : move to utils class ?
        // public getUriFromStringOrResource(stringOrResource: string): string {
        //     return typeof stringOrResource === 'string'? stringOrResource: stringOrResource.getUri();
        // }

        public getFirstElementOrNull(collection: string[]): string | null {
            return collection.length > 0? collection[0]: null;
        }

        public addForClass(forClass: string): this {
            //this.add("solid:forClass", this.getUriFromStringOrResource(forClass));
            this.createStatement(TYPE_INDEX.forClass, forClass);
            return this;
        }

        public addInstance(instance: string): this {
            //this.add("solid:instance", this.getUriFromStringOrResource(instance));
            this.createStatement(TYPE_INDEX.instance, instance);
            return this;
        }

        public addInstanceContainer(instanceContainer: string): this {
            //this.add("solid:instanceContainer", this.getUriFromStringOrResource(instanceContainer));
            this.createStatement(TYPE_INDEX.instanceContainer, instanceContainer);
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
            this.setStatement(TYPE_INDEX.forClass, forClass);
            return this;
        }
    
        public removeForClass(forClass: string): this {
            throw new Error("Method not implemented.");
            // this.deleteStatement(TYPE_INDEX.forClass, forClass);
            // return this;
        }

        public removeInstance(instance: string): this {
            throw new Error("Method not implemented.");
            // this.remove(TYPE_INDEX.forClass, instance);
            // return this;
        }

        public removeInstanceContainer(instanceContainer: string): this {
            throw new Error("Method not implemented.");
            // this.remove(TYPE_INDEX.forClass, instanceContainer);
            // return this;
        }

        public removeForClassAll(): this {
            throw new Error("Method not implemented.");
            // this.removeAll(TYPE_INDEX.forClass);
            // return this;
        }

        public removeInstanceAll(): this {
            throw new Error("Method not implemented.");
            // this.removeAll("solid:instance");
            // return this;
        }

        public removeInstanceContainerAll(): this {
            throw new Error("Method not implemented.");
            // this.removeAll("solid:instanceContainer");
            // return this;
        }

        public toCopy(): ThisType<this> {
            const copy = new TypeIndexRegistrationImpl(this.getUri());
            copy.addStatementAll(this);
            return copy;
        }
    }

}

export default TypeIndexRegistrationMixin;