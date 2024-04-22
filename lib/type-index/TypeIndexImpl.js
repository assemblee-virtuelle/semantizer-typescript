import { TYPE_INDEX } from "./Vocabulary.js";
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
        addForClass(forClass) {
            throw new Error("Method not implemented.");
        }
        addInstance(instance) {
            throw new Error("Method not implemented.");
        }
        addInstanceContainer(instanceContainer) {
            throw new Error("Method not implemented.");
        }
        setForClass(forClass) {
            throw new Error("Method not implemented.");
        }
        removeForClass(forClass) {
            throw new Error("Method not implemented.");
        }
        removeInstance(instance) {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainer(instanceContainer) {
            throw new Error("Method not implemented.");
        }
        removeForClassAll() {
            throw new Error("Method not implemented.");
        }
        removeInstanceAll() {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainerAll() {
            throw new Error("Method not implemented.");
        }
        forEachOfClass(forClass, callbackfn, thisArg) {
            this.forEach((s, i, a) => s.isForClass(forClass) ? callbackfn(s, i, a) : null, thisArg);
        }
        createRegistrationForInstance(forClass, instance, nameHintOrUri) {
            this.createStatement("#reg", "rdf:type", TYPE_INDEX.TypeRegistration);
            this.createStatement("#reg", TYPE_INDEX.forClass, forClass);
            this.createStatement("#reg", TYPE_INDEX.instance, instance);
            return this;
        }
        createRegistrationForInstanceContainer(forClass, instanceContainer, nameHintOrUri) {
            this.createStatement("#reg2", "rdf:type", TYPE_INDEX.TypeRegistration);
            this.createStatement("#reg2", TYPE_INDEX.forClass, forClass);
            this.createStatement("#reg2", TYPE_INDEX.instanceContainer, instanceContainer);
            return this;
        }
    };
}
//# sourceMappingURL=TypeIndexImpl.js.map