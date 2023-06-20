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

import SemanticProperty from "./SemanticProperty";

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
export default interface Semanticable<Add, Set, Remove> {

    addSemanticProperty<T>(name: string, value: T): Add;
    addSemanticProperty<T>(name: string, value: T): Promise<Add>;

    getSemanticProperty<Get>(name: string): Get;
    getSemanticProperty<Get>(name: string): Promise<Get>;

    getSemanticPropertyAll<Get>(name: string): Get[];
    getSemanticPropertyAll<Get>(name: string): Promise<Get[]>;

    getSemanticPropertyValue<Get>(name: string): Get | Semanticable<Add, Set, Remove> | undefined;
    getSemanticPropertyValue<Get>(name: string): Promise<Get | Semanticable<Add, Set, Remove> | undefined>;

    getSemanticPropertyValueAll<Get>(name: string): Get[];
    getSemanticPropertyValueAll<Get>(name: string): Promise<Get[]>;
    
    removeSemanticProperty<T>(name: string, value: T): Remove;
    removeSemanticProperty<T>(name: string, value: T): Promise<Remove>;

    setSemanticProperty<T>(name: string, newValue: T, oldValue: T): Set;
    setSemanticProperty<T>(name: string, newValue: T, oldValue: T): Promise<Set>;

}