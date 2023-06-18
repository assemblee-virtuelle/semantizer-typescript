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
export default interface Semanticable {

    addSemanticProperty<T>(name: string, value: T): T;
    addSemanticProperty<T>(name: string, value: T): Promise<T>;

    getSemanticProperty<T>(name: string): T;
    getSemanticProperty<T>(name: string): Promise<T>;

    getSemanticPropertyAll<T>(name: string): T[];
    getSemanticPropertyAll<T>(name: string): Promise<T[]>;

    getSemanticPropertyValue<T>(name: string): T | Semanticable | undefined;
    getSemanticPropertyValue<T>(name: string): Promise<T | Semanticable | undefined>;

    getSemanticPropertyValueAll<T>(name: string): T[];
    getSemanticPropertyValueAll<T>(name: string): Promise<T[]>;
    
    removeSemanticProperty<T>(name: string, value: T): T;
    removeSemanticProperty<T>(name: string, value: T): Promise<T>;

    setSemanticProperty<T>(name: string, newValue: T, oldValue: T): T;
    setSemanticProperty<T>(name: string, newValue: T, oldValue: T): Promise<T>;

}