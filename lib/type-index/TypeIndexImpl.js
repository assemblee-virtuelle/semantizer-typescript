import { TYPE_INDEX } from "./Vocabulary.js";
// DocumentWritableConstructor<TypeIndexRegistration, Thing> ThingWritable<TypeIndexStatement>
export function TypeIndexMixin(Base) {
    return class TypeIndexImpl extends Base {
        getStatementForClass(registration, forClass) {
            return this.getStatement(registration, TYPE_INDEX.forClass);
        }
        getStatementForInstance(registration, instance) {
            return this.getStatement(registration, TYPE_INDEX.forClass);
        }
        getStatementForInstanceContainer(registration, instanceContainer) {
            return this.getStatement(registration, TYPE_INDEX.forClass);
        }
        getStatementAllForClass(registration, forClass) {
            throw new Error("Method not implemented."); //this.getStatementAll(registration, 
        }
        getStatementAllForInstance(registration, instance) {
            throw new Error("Method not implemented.");
        }
        getStatementAllForInstanceContainer(registration, instanceContainer) {
            throw new Error("Method not implemented.");
        }
        createRegistration() {
            throw new Error("Method not implemented.");
        }
        addForClass(registration, forClass) {
            throw new Error("Method not implemented.");
        }
        addInstance(registration, instance) {
            throw new Error("Method not implemented.");
        }
        addInstanceContainer(registration, instanceContainer) {
            throw new Error("Method not implemented.");
        }
        setForClass(registration, forClass, oldValue) {
            this.setStatement(registration, TYPE_INDEX.forClass, forClass, oldValue);
            return this.getThing(typeof registration === 'string' ? registration : registration.getUri());
        }
        setInstance(registration, instance, oldValue) {
            this.setStatement(registration, TYPE_INDEX.instance, instance, oldValue);
            return this.getThing(typeof registration === 'string' ? registration : registration.getUri());
        }
        setInstanceContainer(registration, instanceContainer, oldValue) {
            this.setStatement(registration, TYPE_INDEX.instanceContainer, instanceContainer, oldValue);
            return this.getThing(typeof registration === 'string' ? registration : registration.getUri());
        }
        removeForClass(registration, ...forClass) {
            throw new Error("Method not implemented.");
        }
        removeInstance(registration, ...instance) {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainer(registration, ...instanceContainer) {
            throw new Error("Method not implemented.");
        }
        removeForClassAll(registration) {
            throw new Error("Method not implemented.");
        }
        removeInstanceAll(registration) {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainerAll(registration) {
            throw new Error("Method not implemented.");
        }
        forEachOfClass(forClass, callbackfn, thisArg) {
            this.forEach((s, i, a) => s.isForClass(forClass) ? callbackfn(s, i, a) : null, thisArg);
        }
        createThing(uriOrNameHint) {
            const registration = super.createThing(uriOrNameHint);
            this.createStatement(registration, "rdf:type", TYPE_INDEX.TypeRegistration);
            return this.getThing(registration.getUri());
        }
        createRegistrationForInstance(forClass, instance, nameHintOrUri) {
            const thing = this.createThing(nameHintOrUri);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instance, instance);
            return this.getThing(thing.getUri());
        }
        createRegistrationForInstanceContainer(forClass, instanceContainer, nameHintOrUri) {
            const thing = this.createThing(nameHintOrUri);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instanceContainer, instanceContainer);
            return this.getThing(thing.getUri());
        }
    };
}
//# sourceMappingURL=TypeIndexImpl.js.map