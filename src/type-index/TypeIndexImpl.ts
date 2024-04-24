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
        addForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        addInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        addInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        
        // TODO: add type Resource to getThing
        public setForClass(registration: string | TypeIndexRegistration, forClass: string, oldValue?: string): TypeIndexRegistration {
            this.setStatement(registration, TYPE_INDEX.forClass, forClass, oldValue);
            return this.getThing(typeof registration === 'string'? registration: registration.getUri())!;
        }

        public setInstance(registration: string | TypeIndexRegistration, instance: string, oldValue?: string): TypeIndexRegistration {
            this.setStatement(registration, TYPE_INDEX.instance, instance, oldValue);
            return this.getThing(typeof registration === 'string'? registration: registration.getUri())!;
        }

        public setInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string, oldValue?: string): TypeIndexRegistration {
            this.setStatement(registration, TYPE_INDEX.instanceContainer, instanceContainer, oldValue);
            return this.getThing(typeof registration === 'string'? registration: registration.getUri())!;
        }

        removeForClass(registration: string | TypeIndexRegistration, ...forClass: string[]): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstance(registration: string | TypeIndexRegistration, ...instance: string[]): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainer(registration: string | TypeIndexRegistration, ...instanceContainer: string[]): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeForClassAll(registration: string | TypeIndexRegistration): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstanceAll(registration: string | TypeIndexRegistration): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainerAll(registration: string | TypeIndexRegistration): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }

        public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void {
            this.forEach((s, i, a) => s.isForClass(forClass)? callbackfn(s, i, a): null, thisArg);
        }

        public createThing(uriOrNameHint?: string): TypeIndexRegistration {
            const registration = super.createThing(uriOrNameHint);
            this.createStatement(registration, "rdf:type", TYPE_INDEX.TypeRegistration);
            return this.getThing(registration.getUri())!;
        }

        public createRegistrationForInstance(forClass: string, instance: string, nameHintOrUri?: string): TypeIndexRegistration {
            const thing = this.createThing(nameHintOrUri);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instance, instance);
            return this.getThing(thing.getUri())!;
        }

        public createRegistrationForInstanceContainer(forClass: string, instanceContainer: string, nameHintOrUri?: string): TypeIndexRegistration {
            const thing = this.createThing(nameHintOrUri);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instanceContainer, instanceContainer);
            return this.getThing(thing.getUri())!;
        }
    }
}