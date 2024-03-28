import ThingDefaultImpl, { ThingType } from "./ThingDefaultImpl";
export class TypeIndexRegistrationDefaultImpl extends ThingDefaultImpl {
    constructor(document, uri) {
        super(document, ThingType.Regular, uri);
        this._forClass = [];
        this._instance = [];
        this._instanceContainer = [];
    }
    isForClass(forClass) {
        return this._getForClass().includes(forClass);
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
        return this._getForClass().slice();
    }
    getInstance() {
        return this.getFirstElementOrNull(this._getInstance());
    }
    getInstanceAll() {
        return this._getInstance().slice();
    }
    getInstanceContainer() {
        return this.getFirstElementOrNull(this._getInstanceContainer());
    }
    getInstanceContainerAll() {
        return this._getInstanceContainer().slice();
    }
}
//# sourceMappingURL=TypeIndexRegistrationDefaultImpl.js.map