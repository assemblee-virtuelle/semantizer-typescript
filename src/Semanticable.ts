/*
Copyright (c) 2023 Maxime Lecoq <maxime@lecoqlibre.fr>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import DatasetExt from 'rdf-ext/lib/Dataset';
import SemanticObjectAnonymous from './SemanticObjectAnonymous';

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
    
    /**
     * Getter for the semantic property "@id". It should return the 
     * URI of this object. If the semantic "@id" property is undefined 
     * the object should be considered as a blank node.
     * @return the semantic id of this object or undefined in case of 
     * a blank node.
     * @see the function Semanticable:isBlankNode
     */
    getSemanticId(): string;

    getSemanticObjectAnonymous(): any;

    /**
     * Getter for the semantic property "@type".
     */
    getSemanticType(): string;

    getSemanticProperty(property: string): any;
    getSemanticPropertyAll(property: string): any[];

    hasSemanticProperty(property: string): boolean;

    isSemanticObjectAnonymous(): boolean;
    isSemanticSameTypeOf(other: Semanticable): boolean;
    isSemanticTypeOf(type: string): boolean;

    setSemanticPropertyReference(property: string, value: Semanticable): void;
    setSemanticPropertyLiteral(property: string, value: string | number | boolean): void;
    setSemanticPropertyAnonymous(property: string, anonymous: Semanticable): void;
    setSemanticPropertyAllFromRdfDataset(dataset: DatasetExt): void;
    
    toRdfDataset(): DatasetExt;

    /**
     * Setter for the semantic property "@id". It registers a property 
     * for the "@id" name if necessary.
     */
    setSemanticId(id: string): void;

}