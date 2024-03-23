import Semanticable from './Semanticable.js';
import SemanticObject from "./SemanticObject.js";
import Semantizer from './Semantizer.js';
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
export default class SemanticObjectAnonymous extends SemanticObject {
    private _blankNode;
    constructor(parameters: {
        semantizer: Semantizer;
        semanticId: string;
        semanticType?: string;
    });
    constructor(parameters: {
        semantizer: Semantizer;
        semanticId: string;
        other: Semanticable;
    });
    protected init(type?: string): void;
    protected createRdfQuad(property: string, value: string): any;
    protected createRdfQuadLiteral(property: string, value: string): any;
    protected createRdfQuadBlankNode(property: string, blankNodeQuad: any): any;
    equals(other: Semanticable): boolean;
    getSemanticObjectAnonymous(): any;
    isSemanticObjectAnonymous(): boolean;
}
//# sourceMappingURL=SemanticObjectAnonymous.d.ts.map