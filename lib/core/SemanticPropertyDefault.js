export default class SemanticPropertyDefault {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    getName() {
        return this.name;
    }
    getValue() {
        return this.value;
    }
    isReference() {
        return this.value instanceof URL;
    }
    update() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=SemanticPropertyDefault.js.map