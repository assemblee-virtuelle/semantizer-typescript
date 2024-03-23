import DatasetExt from 'rdf-ext/lib/Dataset';
import QuadExt from 'rdf-ext/lib/Quad';
import Semanticable from './Semanticable';
import Semantizer from './Semantizer';
import Context from './Context';
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
export default class SemanticObject implements Semanticable {
    private _semantizer;
    private _semanticId;
    private _rdfDataset;
    /**
     * Create a new SemanticObject.
     * @param parameters
     */
    constructor(parameters: {
        semantizer: Semantizer;
        semanticId: string;
        semanticType?: string;
    });
    /**
     * Create a new SemanticObject from an other (copy constructor).
     * The semanticId will be overrided by the one passed as a parameter.
     * @param parameters
     */
    constructor(parameters: {
        semantizer: Semantizer;
        semanticId: string;
        other: Semanticable;
    });
    /**
     * This method should be called to initialize properly a blank node.
     * Because the blank node is created after the constructor of SemanticObject.
     * This method should be deleted when SemanticObjectAnonymous will be removed.
     * @param type The type to coming from the constructor.
     */
    protected init(type?: string): void;
    getContext(): Context;
    getSemantizer(): Semantizer;
    protected addRdfQuad(quad: QuadExt): void;
    private addSemanticPropertyReferenceId;
    addSemanticPropertyReference(property: string, value: Semanticable, replace?: boolean): void;
    addSemanticPropertyLiteral(property: string, value: string | number | boolean, replace?: boolean): void;
    addSemanticPropertyAnonymous(property: string, anonymous: Semanticable, replace?: boolean): void;
    clone(): SemanticObject;
    protected createRdfQuad(property: string, value: string): any;
    static createFromRdfDataset(semantizer: Semantizer, dataset: DatasetExt): SemanticObject;
    protected createRdfQuadLiteral(property: string, value: string): any;
    protected createRdfQuadBlankNode(property: string, blankNodeQuad: any): any;
    protected deleteRdfProperty(property: string): void;
    /**
     *
     * @param other
     * @returns
     * @note We can't use the equals method from the RDF dataset directly because it needs the
     * quads to be in the same order.
     */
    equals(other: Semanticable): boolean;
    getSemanticObjectAnonymous(): any;
    getSemanticId(): string;
    getSemanticType(): any;
    getSemanticProperty(property: string): any;
    /**
     *
     * @param property
     * @returns an array containing the value of all the quad objects.
     */
    getSemanticPropertyAll(property: string): any[];
    getSemanticPropertyAnonymous(property: string): DatasetExt;
    getSemanticPropertyAnonymousAll(property: string): DatasetExt[];
    private getSemanticPropertyAnonymousId;
    getSize(): number;
    hasSameProperties(other: Semanticable): boolean;
    hasSemanticProperty(property: string): boolean;
    isSemanticObjectAnonymous(): boolean;
    isSemanticSameTypeOf(other: Semanticable): boolean;
    isSemanticTypeOf(type: string): boolean;
    removeSemanticProperty(property: string): void;
    setSemanticPropertyReference(property: string, value: Semanticable): void;
    setSemanticPropertyReferenceId(property: string, value: string): void;
    setSemanticPropertyLiteral(property: string, value: string | number | boolean): void;
    setSemanticPropertyAnonymous(property: string, anonymous: Semanticable): void;
    setSemanticId(semanticId: string): void;
    setSemanticPropertyAllFromRdfDataset(dataset: DatasetExt): void;
    /**
     * Return a deep copy of the underlying RDF dataset.
     * @returns
     */
    toRdfDatasetExt(): DatasetExt;
}
//# sourceMappingURL=SemanticObject.d.ts.map