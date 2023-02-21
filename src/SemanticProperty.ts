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

import Propertyable from "./Propertyable";
import Semanticable from "./Semanticable";

/**
 * The SemanticPropety class is the base implementation of the Propertyable 
 * interface.
 * 
 * It uses a function to get the value of the property. This way 
 * we can use a getter function to reflect the property value at the time it 
 * is processed.
 * 
 * For instance, a Person object with a getName method would have the following 
 * property value getter: "() => getName".
 */
export default class SemanticProperty implements Propertyable {

    /**
     * The name of the property.
     * @see The Propertyable:getName method.
     */
    private name: string;

    /**
     * The function to call when the value is requested. It is used by the getValue method.
     * @see The getValue method.
     */
    private valueGetter: () => string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined;

    /**
     * 
     * @param name The name of the property, like "http://xmlns.com/foaf/0.1/name" or "@id" 
     * for instance.
     * @param valueGetter A function used to retrieve the value of the property when requested. 
     * Could be a getter function for instance like "() => getName".
     */
    constructor(name: string, valueGetter: () => string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined) {
        this.name = name;
        this.valueGetter = valueGetter;
    }

    public getName(): string {
        return this.name;
    }

    public getValue(): string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined {
        return this.valueGetter();
    }

}