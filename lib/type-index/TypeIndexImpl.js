import { TYPE_INDEX } from "./Vocabulary.js";
// DocumentWritableConstructor<TypeIndexRegistration, Thing> ThingWritable<TypeIndexStatement>
export function TypeIndexMixin(Base) {
    return class TypeIndexImpl extends Base {
        getForClassAll() {
            throw new Error("Method not implemented.");
        }
        getRegistrationAllForClass(forClass) {
            throw new Error("Method not implemented.");
        }
        getRegistrationAllForInstance(instance) {
            throw new Error("Method not implemented.");
        }
        getRegistrationAllForInstanceContainer(instanceContainer) {
            throw new Error("Method not implemented.");
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
        createRegistration() {
            throw new Error("Method not implemented.");
        }
        addForClassToRegistration(registration, forClass) {
            throw new Error("Method not implemented.");
        }
        addInstanceToRegistration(registration, instance) {
            throw new Error("Method not implemented.");
        }
        addInstanceContainerToRegistration(registration, instanceContainer) {
            throw new Error("Method not implemented.");
        }
        setForClassOfRegistration(registration, forClass, oldValue) {
            this.setStatement(registration, TYPE_INDEX.forClass, forClass, oldValue);
            return this.getThing(registration);
        }
        setInstanceOfRegistration(registration, instance, oldValue) {
            this.setStatement(registration, TYPE_INDEX.instance, instance, oldValue);
            return this.getThing(registration);
        }
        setInstanceContainerOfRegistration(registration, instanceContainer, oldValue) {
            this.setStatement(registration, TYPE_INDEX.instanceContainer, instanceContainer, oldValue);
            return this.getThing(registration);
        }
        removeForClassOfRegistration(registration, ...forClasses) {
            forClasses.forEach(forClass => this.removeStatement(registration, TYPE_INDEX.forClass, forClass));
            return this.getThing(registration);
        }
        removeInstanceOfRegistration(registration, ...instances) {
            instances.forEach(instance => this.removeStatement(registration, TYPE_INDEX.instance, instance));
            return this.getThing(registration);
        }
        removeInstanceContainerOfRegistration(registration, ...instanceContainers) {
            instanceContainers.forEach(instanceContainer => this.removeStatement(registration, TYPE_INDEX.instanceContainer, instanceContainer));
            return this.getThing(registration);
        }
        removeForClassAllOfRegistration(registration) {
            throw new Error("Method not implemented.");
        }
        removeInstanceAllOfRegistration(registration) {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainerAllOfRegistration(registration) {
            throw new Error("Method not implemented.");
        }
        forEachOfClass(forClass, callbackfn, thisArg) {
            this.forEach((s, i, a) => s.isForClass(forClass) ? callbackfn(s, i, a) : null, thisArg);
        }
        createThing(uriOrNameHint) {
            const registration = super.createThing(uriOrNameHint);
            this.createStatement(registration, "rdf:type", TYPE_INDEX.TypeRegistration);
            return this.getThing(registration);
        }
        createRegistrationForInstance(forClass, instance, nameHintOrUri) {
            const registration = this.createThing(nameHintOrUri);
            this.createStatement(registration, TYPE_INDEX.forClass, forClass);
            this.createStatement(registration, TYPE_INDEX.instance, instance);
            return this.getThing(registration);
        }
        createRegistrationForInstanceContainer(forClass, instanceContainer, nameHintOrUri) {
            const registration = this.createThing(nameHintOrUri);
            this.createStatement(registration, TYPE_INDEX.forClass, forClass);
            this.createStatement(registration, TYPE_INDEX.instanceContainer, instanceContainer);
            return this.getThing(registration);
        }
    };
}
//# sourceMappingURL=TypeIndexImpl.js.map