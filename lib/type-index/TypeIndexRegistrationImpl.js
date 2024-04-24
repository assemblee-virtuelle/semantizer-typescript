import { TypeIndexRegistrationStatementMixin } from "./TypeIndexRegistrationStatement.js";
import { TYPE_INDEX } from "./Vocabulary.js";
export function TypeIndexRegistrationMixin(Base, StatementImpl) {
    return class TypeIndexRegistrationImpl extends Base {
        // constructor(document: TypeIndex, uri?: string) {
        // super(document); //, ThingType.Regular, uri);
        // }
        // public toString(): string {
        //     return "";
        // }
        toString() {
            return "Hello";
        }
        constructor(...args) {
            super(TypeIndexRegistrationStatementMixin(StatementImpl), ...args);
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
export default TypeIndexRegistrationMixin;
//# sourceMappingURL=TypeIndexRegistrationImpl.js.map