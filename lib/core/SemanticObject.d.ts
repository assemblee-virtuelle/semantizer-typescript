import Semanticable from './Semanticable';
/**
 * The SemanticObject class is the base implementation of the Semanticable
 * interface. It allows an object to store semantic properties and to be
 * serialized. To add a semantic property to that object, use the
 * registerSemanticProperty methods.
 *
 * @see The Semanticable interface.
 * @see The Propertyable interface.
 * @see The registerSemanticProperty() method.
 */
export default abstract class SemanticObject<Dataset> implements Semanticable {
    private _dataset;
    constructor(dataset: Dataset, other?: SemanticObject<Dataset>);
    protected getDataset(): Dataset;
    protected execute<T>(sparql: string): T | undefined;
    protected execute<T>(sparql: string): Promise<T | undefined>;
    protected abstract handle<T>(sparqlRequest: string): T | undefined;
    protected abstract handle<T>(sparqlRequest: string): Promise<T | undefined>;
    addSemanticProperty<Value, Return = void>(name: string, value: Value): Return | undefined;
    addSemanticProperty<Value, Return = void>(name: string, value: Value): Promise<Return | undefined>;
    getSemanticProperty<Return>(name: string): Return | undefined;
    getSemanticProperty<Return>(name: string): Promise<Return | undefined>;
    getSemanticPropertyAll<Return>(name: string): Return[];
    getSemanticPropertyAll<Return>(name: string): Promise<Return[]>;
    setSemanticProperty<Value, Return = void>(name: string, newValue: Value, oldValue: Value): Return | undefined;
    setSemanticProperty<Value, Return = void>(name: string, newValue: Value, oldValue: Value): Promise<Return | undefined>;
    removeSemanticProperty<Value, Return = void>(name: string, value: Value): Return | undefined;
    removeSemanticProperty<Value, Return = void>(name: string, value: Value): Promise<Return | undefined>;
}
//# sourceMappingURL=SemanticObject.d.ts.map