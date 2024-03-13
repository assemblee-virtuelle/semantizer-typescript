/**
 * The Semanticable interface is the way to define semantic objects that
 * contain semantic properties (Propertyable). The properties of a
 * Semanticable object can be publicly iterated. This allows the object
 * to be serialized in any format like plain object or JSON-LD for instance.
 *
 * Serialization is made thanks to a Serializer object. This object
 * manages the way the object it processes must be serialized.
 *
 * @see the SemanticObject, the default implementation class.
 * @see The Serializer interface, to manage serialization.
 */
export default interface Semanticable {
    addSemanticProperty<Value, Return = void>(name: string, value: Value): Return | undefined;
    addSemanticProperty<Value, Return = void>(name: string, value: Value): Promise<Return | undefined>;
    getSemanticProperty<Return>(name: string): Return | undefined;
    getSemanticProperty<Return>(name: string): Promise<Return | undefined>;
    getSemanticPropertyAll<Return>(name: string): Return[];
    getSemanticPropertyAll<Return>(name: string): Promise<Return[]>;
    removeSemanticProperty<Value, Return = void>(name: string, value: Value): Return | undefined;
    removeSemanticProperty<Value, Return = void>(name: string, value: Value): Promise<Return | undefined>;
    setSemanticProperty<Value, Return = void>(name: string, newValue: Value, oldValue: Value): Return | undefined;
    setSemanticProperty<Value, Return = void>(name: string, newValue: Value, oldValue: Value): Promise<Return | undefined>;
}
//# sourceMappingURL=Semanticable.d.ts.map