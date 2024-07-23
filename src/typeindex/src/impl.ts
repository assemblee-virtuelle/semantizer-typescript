import {
    DocumentWithDestructiveOperationsConstructor,
    Statement,
    StatementConstructorMixin,
    Thing,
    ThingConstructorMixin
} from "@semantizer/types";
import { TypeIndex, TypeIndexRegistration, TypeIndexStatement } from "./types.js";
import { TYPE_INDEX } from "./voc.js";

const RDF = {
    TYPE: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
}


// DocumentWritableConstructor<TypeIndexRegistration, Thing> ThingWritable<TypeIndexStatement>
export function TypeIndexMixin<
    TBase extends DocumentWithDestructiveOperationsConstructor<TypeIndexRegistration, Thing<TypeIndexStatement>>
>(Base: TBase) {
    return class TypeIndexImpl extends Base implements TypeIndex {

        public constructor(...args: any[]) {
            super(...args);
            this.createStatementAboutSelf(RDF.TYPE, TYPE_INDEX.TypeIndex);
            this.createStatementAboutSelf(RDF.TYPE, TYPE_INDEX.ListedDocument);
        }

        public getForClassAll(): string[] {
            throw new Error("Method not implemented.");
        }

        public getRegistrationAllForClass(forClass: string): TypeIndexRegistration[] {
            return this.filter(t => t.isForClass(forClass));
        }

        public getRegistrationAllForInstance(instance: string): TypeIndexRegistration[] {
            return this.filter(t => t.getInstanceAll().includes(instance));
        }

        public getRegistrationAllForInstanceContainer(instanceContainer: string): TypeIndexRegistration[] {
            return this.filter(t => t.getInstanceContainerAll().includes(instanceContainer));
        }

        // public getStatementForClass(registration: string | TypeIndexRegistration): TypeIndexStatement | undefined {
        //     return this.getStatement(registration, TYPE_INDEX.forClass);
        // }

        // public getStatementForInstance(registration: string | TypeIndexRegistration): TypeIndexStatement | undefined {
        //     return this.getStatement(registration, TYPE_INDEX.forClass);
        // }

        // public getStatementForInstanceContainer(registration: string | TypeIndexRegistration): TypeIndexStatement | undefined {
        //     return this.getStatement(registration, TYPE_INDEX.forClass);
        // }

        // public getStatementAllForClass(registration: string | TypeIndexRegistration): TypeIndexStatement[] {
        //     return this.getStatementAll(registration, TYPE_INDEX.forClass);
        // }
        
        // public getStatementAllForInstance(registration: string | TypeIndexRegistration): TypeIndexStatement[] {
        //     return this.getStatementAll(registration, TYPE_INDEX.instance);
        // }

        // public getStatementAllForInstanceContainer(registration: string | TypeIndexRegistration): TypeIndexStatement[] {
        //     return this.getStatementAll(registration, TYPE_INDEX.instanceContainer);
        // }

        createRegistration(): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        addForClassToRegistration(registration: string | TypeIndexRegistration, forClass: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        addInstanceToRegistration(registration: string | TypeIndexRegistration, instance: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        addInstanceContainerToRegistration(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        
        public setForClassOfRegistration(registration: string | TypeIndexRegistration, forClass: string, oldValue?: string): TypeIndexRegistration {
            this.setStatement(registration, TYPE_INDEX.forClass, forClass, oldValue);
            return this.getThing(registration);
        }

        public setInstanceOfRegistration(registration: string | TypeIndexRegistration, instance: string, oldValue?: string): TypeIndexRegistration {
            this.setStatement(registration, TYPE_INDEX.instance, instance, oldValue);
            return this.getThing(registration);
        }

        public setInstanceContainerOfRegistration(registration: string | TypeIndexRegistration, instanceContainer: string, oldValue?: string): TypeIndexRegistration {
            this.setStatement(registration, TYPE_INDEX.instanceContainer, instanceContainer, oldValue);
            return this.getThing(registration);
        }

        public removeForClassOfRegistration(registration: string | TypeIndexRegistration, ...forClasses: string[]): TypeIndexRegistration {
            forClasses.forEach(forClass => this.removeStatement(registration, TYPE_INDEX.forClass, forClass));
            return this.getThing(registration);
        }

        public removeInstanceOfRegistration(registration: string | TypeIndexRegistration, ...instances: string[]): TypeIndexRegistration {
            instances.forEach(instance => this.removeStatement(registration, TYPE_INDEX.instance, instance));
            return this.getThing(registration);
        }
        
        public removeInstanceContainerOfRegistration(registration: string | TypeIndexRegistration, ...instanceContainers: string[]): TypeIndexRegistration {
            instanceContainers.forEach(instanceContainer => this.removeStatement(registration, TYPE_INDEX.instanceContainer, instanceContainer));
            return this.getThing(registration);
        }
        
        removeForClassAllOfRegistration(registration: string | TypeIndexRegistration): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstanceAllOfRegistration(registration: string | TypeIndexRegistration): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainerAllOfRegistration(registration: string | TypeIndexRegistration): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }

        public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void {
            this.forEach((s, i, a) => s.isForClass(forClass)? callbackfn(s, i, a): null, thisArg);
        }

        public createThing(uriOrNameHint?: string): TypeIndexRegistration {
            const registration = super.createThing(uriOrNameHint);
            this.createStatement(registration, RDF.TYPE, TYPE_INDEX.TypeRegistration);
            return this.getThing(registration);
        }

        public createRegistrationForInstance(forClass: string, instance: string, nameHintOrUri?: string): TypeIndexRegistration {
            const registration = this.createThing(nameHintOrUri);
            this.createStatement(registration, TYPE_INDEX.forClass, forClass);
            this.createStatement(registration, TYPE_INDEX.instance, instance);
            return this.getThing(registration);
        }

        public createRegistrationForInstanceContainer(forClass: string, instanceContainer: string, nameHintOrUri?: string): TypeIndexRegistration {
            const registration = this.createThing(nameHintOrUri);
            this.createStatement(registration, TYPE_INDEX.forClass, forClass);
            this.createStatement(registration, TYPE_INDEX.instanceContainer, instanceContainer);
            return this.getThing(registration);
        }
    }
}

export function TypeIndexRegistrationMixin<
    TBase extends ThingConstructorMixin<Thing<TypeIndexStatement>>
>(Base: TBase) {
    return class TypeIndexRegistrationImpl extends Base implements TypeIndexRegistration {

        public constructor(...args: any[]) {
            super(...args);
        }

        public toString() : string {
            return `TypeIndexRegistration <${this.getUri()}>`;
        }

        getInstanceAndInstanceContainerAll(): string[] {
            throw new Error("Method not implemented.");
        }

        public isForClass(forClass: string): boolean {
            return this.getForClassAll().includes(forClass);
        }

        // TODO : move to utils class ?
        // public getUriFromStringOrResource(stringOrResource: string): string {
        //     return typeof stringOrResource === 'string'? stringOrResource: stringOrResource.getUri();
        // }

        public getFirstElementOrNull(collection: string[]): string | undefined {
            return collection.length > 0? collection[0]: undefined;
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

        public getForClass(): string | undefined {
            return this.getFirstElementOrNull(this.getForClassAll());
        }

        public getForClassAll(): string[] {
            return this.getStatementAll(TYPE_INDEX.forClass).map(t => t.getValue());
        }

        public getInstance(): string | undefined {
            return this.getFirstElementOrNull(this.getInstanceAll());
        }

        public getInstanceAll(): string[] {
            return this.getStatementAll(TYPE_INDEX.instance).map(t => t.getValue());
        }

        public getInstanceContainer(): string | undefined {
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

export function TypeIndexRegistrationStatementMixin<
    TBase extends StatementConstructorMixin<Statement>
>(Base: TBase) {
 
    return class TypeIndexRegistrationStatementImpl extends Base implements TypeIndexStatement {

        public constructor(...args: any[]) {
            super(...args);
        }

        public isForClass(forClass: string): boolean {
            throw new Error("Method not implemented");
        }

        public isForInstance(instance: string): boolean {
            throw new Error("Method not implemented");
        }

        public isForInstanceContainer(instanceContainer: string): boolean {
            throw new Error("Method not implemented");
        }

    }

}