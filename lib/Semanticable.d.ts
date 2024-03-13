import DatasetExt from 'rdf-ext/lib/Dataset';
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
    addSemanticPropertyReference(property: string, value: Semanticable, replace: boolean): void;
    addSemanticPropertyLiteral(property: string, value: string | number | boolean, replace: boolean): void;
    addSemanticPropertyAnonymous(property: string, anonymous: Semanticable, replace: boolean): void;
    clone(): Semanticable;
    equals(other: Semanticable): boolean;
    getContext(): Object;
    getSemanticId(): string;
    getSemanticType(): string;
    getSemanticProperty(property: string): any;
    getSemanticPropertyAll(property: string): any[];
    getSemanticPropertyAnonymous(property: string): DatasetExt;
    getSemanticPropertyAnonymousAll(property: string): DatasetExt[];
    getSemanticObjectAnonymous(): any;
    getSize(): number;
    hasSameProperties(other: Semanticable): boolean;
    hasSemanticProperty(property: string): boolean;
    isSemanticObjectAnonymous(): boolean;
    isSemanticSameTypeOf(other: Semanticable): boolean;
    isSemanticTypeOf(type: string): boolean;
    setSemanticPropertyReference(property: string, value: Semanticable): void;
    setSemanticPropertyLiteral(property: string, value: string | number | boolean): void;
    setSemanticPropertyAnonymous(property: string, anonymous: Semanticable): void;
    setSemanticPropertyAllFromRdfDataset(dataset: DatasetExt): void;
    setSemanticId(id: string): void;
    toRdfDatasetExt(): DatasetExt;
}
//# sourceMappingURL=Semanticable.d.ts.map