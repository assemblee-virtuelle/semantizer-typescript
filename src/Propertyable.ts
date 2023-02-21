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

import Semanticable from "./Semanticable";

/**
 * This interface define semantic properties. They are used by a 
 * semantic object to store semantic data. A property associates 
 * a name (generally an URI) to a value getter function that gives 
 * the value of the Property.
 * 
 * For instance a FOAF Person may contain the following properties:
 * - "@id": "http://platform.example/John"
 * - "@type": "http://xmlns.com/foaf/0.1/Person"
 * - "http://xmlns.com/foaf/0.1/name": () => "John"
 */
export default interface Propertyable {

    /**
     * Gives the name of this property. It should be an URI or
     * a predefined semantic name like "@id" or "@type".
     * @return the name of the property.
     */
    getName(): string;

    /**
     * Gives the value of the property.
     * @return the value of the property.
     */
    getValue(): string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined;

}