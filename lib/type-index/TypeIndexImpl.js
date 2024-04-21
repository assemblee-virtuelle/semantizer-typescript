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
        createRegistration(forClass, nameHintOrUri) {
            // const registration = this.createThingWithUri(nameHintOrUri);
            // if (forClass)
            //     registration.addForClass(forClass);
            // return registration;
            return this;
        }
    };
}
//# sourceMappingURL=TypeIndexImpl.js.map