import { TYPE_INDEX } from "./voc.js";
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
export function TypeIndexRegistrationMixin(Base, StatementImpl) {
    return class TypeIndexRegistrationImpl extends Base {
        // constructor(document: TypeIndex, uri?: string) {
        // super(document); //, ThingType.Regular, uri);
        // }
        toString() {
            return `TypeIndexRegistration <${this.getUri()}>`;
        }
        constructor(...args) {
            super(TypeIndexRegistrationStatementMixin(StatementImpl), ...args);
        }
        getInstanceAndInstanceContainerAll() {
            throw new Error("Method not implemented.");
        }
        isForClass(forClass) {
            return this.getForClassAll().includes(forClass);
        }
        // TODO : move to utils class ?
        // public getUriFromStringOrResource(stringOrResource: string): string {
        //     return typeof stringOrResource === 'string'? stringOrResource: stringOrResource.getUri();
        // }
        getFirstElementOrNull(collection) {
            return collection.length > 0 ? collection[0] : null;
        }
        addForClass(forClass) {
            //this.add("solid:forClass", this.getUriFromStringOrResource(forClass));
            this.createStatement(TYPE_INDEX.forClass, forClass);
            return this;
        }
        addInstance(instance) {
            //this.add("solid:instance", this.getUriFromStringOrResource(instance));
            this.createStatement(TYPE_INDEX.instance, instance);
            return this;
        }
        addInstanceContainer(instanceContainer) {
            //this.add("solid:instanceContainer", this.getUriFromStringOrResource(instanceContainer));
            this.createStatement(TYPE_INDEX.instanceContainer, instanceContainer);
            return this;
        }
        getForClass() {
            return this.getFirstElementOrNull(this.getForClassAll());
        }
        getForClassAll() {
            return []; // this.getAll("solid:forClass");
        }
        getInstance() {
            return this.getFirstElementOrNull(this.getInstanceAll());
        }
        getInstanceAll() {
            return []; // this.getAll("solid:instance");
        }
        getInstanceContainer() {
            return this.getFirstElementOrNull(this.getInstanceContainerAll());
        }
        getInstanceContainerAll() {
            return []; // this.getAll("solid:instanceContainer");
        }
        setForClass(forClass) {
            this.setStatement(TYPE_INDEX.forClass, forClass);
            return this;
        }
        removeForClass(forClass) {
            throw new Error("Method not implemented.");
            // this.deleteStatement(TYPE_INDEX.forClass, forClass);
            // return this;
        }
        removeInstance(instance) {
            throw new Error("Method not implemented.");
            // this.remove(TYPE_INDEX.forClass, instance);
            // return this;
        }
        removeInstanceContainer(instanceContainer) {
            throw new Error("Method not implemented.");
            // this.remove(TYPE_INDEX.forClass, instanceContainer);
            // return this;
        }
        removeForClassAll() {
            throw new Error("Method not implemented.");
            // this.removeAll(TYPE_INDEX.forClass);
            // return this;
        }
        removeInstanceAll() {
            throw new Error("Method not implemented.");
            // this.removeAll("solid:instance");
            // return this;
        }
        removeInstanceContainerAll() {
            throw new Error("Method not implemented.");
            // this.removeAll("solid:instanceContainer");
            // return this;
        }
        toCopy() {
            const copy = new TypeIndexRegistrationImpl(this.getUri());
            copy.addStatementAll(this);
            return copy;
        }
    };
}
export function TypeIndexRegistrationStatementMixin(Base) {
    return class TypeIndexRegistrationStatementImpl extends Base {
        isForClass(forClass) {
            throw new Error("Method not implemented");
        }
        isForInstance(instance) {
            throw new Error("Method not implemented");
        }
        isForInstanceContainer(instanceContainer) {
            throw new Error("Method not implemented");
        }
    };
}
//# sourceMappingURL=impl.js.map