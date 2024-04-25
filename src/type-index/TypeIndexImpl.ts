import { DocumentWritableConstructor } from "../core/Document";
import { ThingWritable } from "../core/Thing";
import { TypeIndexStatement, TypeIndexWritable } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";
import { TYPE_INDEX } from "./Vocabulary.js";

// DocumentWritableConstructor<TypeIndexRegistration, Thing> ThingWritable<TypeIndexStatement>
export function TypeIndexMixin<
    TBase extends DocumentWritableConstructor<TypeIndexRegistration, ThingWritable<TypeIndexStatement>>
>(Base: TBase) {
    return class TypeIndexImpl extends Base implements TypeIndexWritable {

        public getStatementForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexStatement | undefined {
            return this.getStatement(registration, TYPE_INDEX.forClass);
        }

        public getStatementForInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexStatement | undefined {
            return this.getStatement(registration, TYPE_INDEX.forClass);
        }

        public getStatementForInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexStatement | undefined {
            return this.getStatement(registration, TYPE_INDEX.forClass);
        }

        getStatementAllForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexStatement[] {
            throw new Error("Method not implemented.");//this.getStatementAll(registration, 
        }
        getStatementAllForInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexStatement[] {
            throw new Error("Method not implemented.");
        }
        getStatementAllForInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexStatement[] {
            throw new Error("Method not implemented.");
        }
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
            this.createStatement(registration, "rdf:type", TYPE_INDEX.TypeRegistration);
            return this.getThing(registration);
        }

        public createRegistrationForInstance(forClass: string, instance: string, nameHintOrUri?: string): TypeIndexRegistration {
            const thing = this.createThing(nameHintOrUri);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instance, instance);
            return this.getThing(thing);
        }

        public createRegistrationForInstanceContainer(forClass: string, instanceContainer: string, nameHintOrUri?: string): TypeIndexRegistration {
            const thing = this.createThing(nameHintOrUri);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instanceContainer, instanceContainer);
            return this.getThing(thing);
        }
    }
}