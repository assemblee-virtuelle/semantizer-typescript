export default class IdGenerator {
    constructor() {
        this.count = 0;
    }
    generate() {
        this.count++;
        return "local://" + this.count;
    }
}
//# sourceMappingURL=IdGenerator.js.map