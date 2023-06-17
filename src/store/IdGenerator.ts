import IdGeneratorInterface from "./IdGeneratorInterface";

export default class IdGenerator implements IdGeneratorInterface<string> {

    private count: number;

    constructor() {
        this.count = 0;
    }

    public generate(): string {
        this.count++;
        return "local://" + this.count;
    }

}