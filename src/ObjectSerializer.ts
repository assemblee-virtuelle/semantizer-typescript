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

import Semanticable from './Semanticable.js'
import Serializer from './Serializer';

/**
 * This allows an object to be serialized as a simple JavaScript object.
 * It iterates over its properties and output their name associated to 
 * their value.
 * 
 * For example, serializing a Person object with a foaf:name property will 
 * output a JavaScript object like { "http://xmlns.com/foaf/0.1/name": "John" }.
 * 
 * If a property references an other semantic object, this algorythm will 
 * only output the "@id" property of the object (no dereferencing).
 * 
 * This serializer handles blank nodes.
 * 
 * This serializer can be used with a library like jsonld to produce 
 * contextualized JSON-LD documents.
 */
export default class ObjectSerializer implements Serializer<object> {

    /**
     * @inheritDoc
     * 
     * Iterates through the properties of the subject to output a 
     * JavaScript object like { "http://xmlns.com/foaf/0.1/name": "John" }.
     * 
     * @throws An Error if the an iterated property value is not a primitive 
     * nor a Semanticable nor an array or iterable. 
     */
    public process(subject: Semanticable): object {
        let result: any = {};

        for (let property of subject.getSemanticProperties()) {
            const name: string = property.getName();
            const value = property.getValue();

            if (!value)
                continue;

            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean")
                result[name] = value;

            else if (value && 'getSemanticId' in value)
                if (value.isBlankNode())
                    result[name] = this.process(value);
                else result[name] = value.getSemanticId();

            else if (Array.isArray(value))
                result[name] = this.exportCollection(value.values());

            else if ('next' in value)
                result[name] = this.exportCollection(value);

            else throw new Error("The value of the property " + name + " is not a primitive, nor a Semanticable nor an Array or IterableIterator.");
        }
     
        return result;
    }

    /**
     * This method is used to process collections.
     * 
     * It returns an array which contains the serialization of its values.
     * 
     * If the collection is a collection of primitives, this method will return an 
     * array of these primitives like [ 1, 2, 3, ... ] or [ "string1", "string2", ... ].
     * 
     * If the collection is a collection of Semanticable, this method will return an 
     * array containing the "@id" property of the Semanticable objects like 
     * [ "semanticIdOfObject1", "semanticIdOfObject2", ... ].
     * 
     * If the collection is a collection of blank nodes, this method will return an 
     * array containing the blank node objects like [ { blankNode1}, {blankNode2}, ... ].
     * 
     * @param values An iterator for the values to process.
     * @returns An array containing the serialized values.
     */
    private exportCollection(values: IterableIterator<string | number | boolean | Semanticable>): Array<string | number | boolean | object | Semanticable> {
        let collection: Array<string | number | boolean | object | Semanticable> = [];

        let iteratorResult: IteratorResult<string | number | boolean | Semanticable> = values.next();
        
        // We take the first element of the collection to check type.
        const first: string | number | boolean | Semanticable = iteratorResult.value;

        if (!iteratorResult.done) {

            // If the collection is a collection of primitives, we simply 
            // return an array of these primitives.
            if ([ 'string', 'number', 'boolean' ].includes(typeof first)) {
                collection = [ first, ...Array.from(values) ];
            }

            // If the collection is a collection of Semanticable, we export 
            // the object if it is a blank node, else we just export its "@id" 
            // property (no dereferencing).
            else {
                // @ts-ignore
                let item: Semanticable = first;

                while (!iteratorResult.done) {
                    if (item.isBlankNode())
                        collection.push(this.process(item));
                    else
                        collection.push(item.getSemanticId() ?? 'unknown');

                    iteratorResult = values.next();
                    item = iteratorResult.value;
                }
            }
        }

        return collection;
    }

}