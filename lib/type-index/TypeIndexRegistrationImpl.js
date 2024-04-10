import ThingImpl, { ThingType } from "../core-default/ThingImpl";
// type TypeIndexRegistrationThing = TypeIndexRegistration<TypeIndexDocument>;
// type TypeIndexDocument = TypeIndex<TypeIndexRegistrationThing, TypeIndexRegistrationThing>;
export class TypeIndexRegistrationImpl extends ThingImpl //ContainedStatement> 
 {
    constructor(document, uri) {
        super(document, ThingType.Regular, uri);
    }
    isForClass(forClass) {
        return this.getForClassAll().includes(forClass);
    }
    // TODO : move to utils class ?
    getUriFromStringOrResource(stringOrResource) {
        return typeof stringOrResource === 'string' ? stringOrResource : stringOrResource.getUri();
    }
    getFirstElementOrNull(collection) {
        return collection.length > 0 ? collection[0] : null;
    }
    addForClass(forClass) {
        //this.add("solid:forClass", this.getUriFromStringOrResource(forClass));
        return this;
    }
    addInstance(instance) {
        //this.add("solid:instance", this.getUriFromStringOrResource(instance));
        return this;
    }
    addInstanceContainer(instanceContainer) {
        //this.add("solid:instanceContainer", this.getUriFromStringOrResource(instanceContainer));
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
        throw new Error();
    }
    removeForClass(forClass) {
        this.remove("solid:forClass", forClass);
        return this;
    }
    removeInstance(instance) {
        this.remove("solid:forClass", instance);
        return this;
    }
    removeInstanceContainer(instanceContainer) {
        this.remove("solid:forClass", instanceContainer);
        return this;
    }
    removeForClassAll() {
        this.removeAll("solid:forClass");
        return this;
    }
    removeInstanceAll() {
        this.removeAll("solid:instance");
        return this;
    }
    removeInstanceContainerAll() {
        this.removeAll("solid:instanceContainer");
        return this;
    }
}
export default TypeIndexRegistrationImpl;
//# sourceMappingURL=TypeIndexRegistrationImpl.js.map