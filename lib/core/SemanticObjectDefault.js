import SemanticPropertyDefault from "./SemanticPropertyDefault.js";
import SemanticObjectDefaultHandler from "./SemanticObjectDefaultHandler.js";
import SemanticObject from "./SemanticObject.js";
import HandlerTest from "./HandlerTest.js";
export default class SemanticObjectDefault extends SemanticObject {
    constructor(other) {
        super(new Array(), other);
    }
    handle(sparqlRequest) {
        const handler = new SemanticObjectDefaultHandler(new HandlerTest(this));
        return handler.handle(sparqlRequest);
    }
    createSemanticProperty(name, value) {
        return new SemanticPropertyDefault(name, value);
    }
    findIndex(name, value) {
        return this.getDataset().findIndex((p) => p.getName() === name && p.getValue() === value);
    }
    add(name, value) {
        this.getDataset().push(this.createSemanticProperty(name, value));
    }
    get(name) {
        return this.getDataset().find((p) => p.getName() === name);
    }
    getAll(name) {
        return this.getDataset().filter((p) => p.getName() === name);
    }
    set(name, newValue, oldValue) {
        const index = this.findIndex(name, oldValue);
        if (-1 !== index)
            this.getDataset().splice(index, 1, this.createSemanticProperty(name, newValue));
    }
    unset(name, value) {
        const index = this.findIndex(name, value);
        if (-1 !== index)
            this.getDataset().splice(index, 1);
    }
}
//# sourceMappingURL=SemanticObjectDefault.js.map