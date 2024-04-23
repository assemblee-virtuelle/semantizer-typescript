import { TYPE_INDEX } from "./Vocabulary.js";
// DocumentWritableConstructor<TypeIndexRegistration, Thing> ThingWritable<TypeIndexStatement>
export function TypeIndexMixin(Base) {
    return class TypeIndexImpl extends Base {
        getStatementForClass(forClass) {
            throw new Error("Method not implemented.");
        }
        getStatementForInstance(instance) {
            throw new Error("Method not implemented.");
        }
        getStatementForInstanceContainer(instanceContainer) {
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
        setForClass(registration, forClass) {
            throw new Error("Method not implemented.");
        }
        removeForClass(registration, forClass) {
            throw new Error("Method not implemented.");
        }
        removeInstance(registration, instance) {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainer(registration, instanceContainer) {
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
            return registration;
        }
        createRegistrationForInstance(forClass, instance, nameHintOrUri) {
            // this.addThing(new TypeIndexRegistrationImpl(forClass, instance, instanceContainer));
            const thing = this.createThing(nameHintOrUri);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instance, instance);
            return thing;
        }
        createRegistrationForInstanceContainer(forClass, instanceContainer, nameHintOrUri) {
            const thing = this.createThing(nameHintOrUri);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instanceContainer, instanceContainer);
            return thing;
        }
    };
}
//# sourceMappingURL=TypeIndexImpl.js.map