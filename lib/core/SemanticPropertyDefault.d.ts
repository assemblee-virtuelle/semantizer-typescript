import Subscriber from "../notification/Subscriber";
import SemanticProperty from "./SemanticProperty";
export default class SemanticPropertyDefault<T> implements SemanticProperty<T>, Subscriber {
    private name;
    private value;
    constructor(name: string, value: T);
    getName(): string;
    getValue(): T;
    isReference(): boolean;
    update(): void;
}
//# sourceMappingURL=SemanticPropertyDefault.d.ts.map