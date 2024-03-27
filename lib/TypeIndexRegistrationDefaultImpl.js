import ThingDefaultImpl, { StateType } from "./ThingDefaultImpl";
export class TypeIndexRegistrationDefaultImpl extends ThingDefaultImpl {
    constructor(thing) {
        super(thing.getDocument(), StateType.Regular, thing.getUri());
        this._forClass = [];
        this._instance = [];
        this._instanceContainer = [];
    }
    // TODO : move to utils class ?
    getUriFromStringOrResource(stringOrResource) {
        return typeof stringOrResource === 'string' ? stringOrResource : stringOrResource.getUri();
    }
    getFirstElementOrNull(collection) {
        return collection.length > 0 ? collection[0] : null;
    }
    _getForClass() {
        return this._forClass;
    }
    _getInstance() {
        return this._instance;
    }
    _getInstanceContainer() {
        return this._instanceContainer;
    }
    addForClass(forClass) {
        this._getForClass().push(this.getUriFromStringOrResource(forClass));
        return this;
    }
    addInstance(instance) {
        this._getInstance().push(this.getUriFromStringOrResource(instance));
        return this;
    }
    addInstanceContainer(instanceContainer) {
        this._getInstanceContainer().push(this.getUriFromStringOrResource(instanceContainer));
        return this;
    }
    getForClass() {
        return this.getFirstElementOrNull(this._getForClass());
    }
    getForClassAll() {
        return this._getForClass(); // TODO: return copy
    }
    getInstance() {
        return this.getFirstElementOrNull(this._getInstance());
    }
    getInstanceAll() {
        return this._getInstance(); // TODO: return copy
    }
    getInstanceContainer() {
        return this.getFirstElementOrNull(this._getInstanceContainer());
    }
    getInstanceContainerAll() {
        return this._getInstanceContainer(); // TODO: return copy
    }
}
//# sourceMappingURL=TypeIndexRegistrationDefaultImpl.js.map