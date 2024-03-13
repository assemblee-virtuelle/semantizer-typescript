import SemanticProperty from "./SemanticProperty.js";
import SemanticObject from "./SemanticObject.js";
type Property = SemanticProperty<any>;
export default class SemanticObjectDefault extends SemanticObject<Array<Property>> {
    constructor(other?: SemanticObjectDefault);
    protected handle<T>(sparqlRequest: string): T | undefined;
    protected handle<T>(sparqlRequest: string): Promise<T | undefined>;
    protected createSemanticProperty<Value>(name: string, value: Value): SemanticProperty<Value>;
    private findIndex;
    add<T>(name: string, value: T): void;
    get<T>(name: string): Property | undefined;
    getAll(name: string): Property[];
    set<T>(name: string, newValue: T, oldValue: T): void;
    unset<T>(name: string, value: T): void;
}
export {};
//# sourceMappingURL=SemanticObjectDefault.d.ts.map