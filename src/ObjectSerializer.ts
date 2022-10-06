/*
Copyright (C) 2022 Maxime Lecoq <maxime@lecoqlibre.fr>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
 * In case of Reference, this algorythm only output its "@id" property.
 * 
 * This serializer can be used with a library like jsonld to produce 
 * contextualized JSON-LD documents.
 */
export default class ObjectSerializer implements Serializer<object> {

    public process(subject: Semanticable): object {
        let result: object = this.exportSemanticObjectIdAndType(subject);

        for (let property of subject.getProperties()) {
            const name: string = property.getName();
            const value = property.getValue();
            let current: object = {};

            if (!value)
                continue;

            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean")
                current = this.exportPrimitive(name, value);

            else if (value && 'getSemanticId' in value)
                current = this.exportSemanticable(name, value);

            else if (Array.isArray(value))
                current = this.exportCollection(name, value.values());

            else if ('next' in value)
                current = this.exportCollection(name, value);

            result = { ...result, ...current };
        }
     
        return result;
    }

    /**
     * Returns a simple JavaScript object containing the "@id", 
     * the "@type" and the children of the specified object.
     * 
     * @param semanticObject The object or reference to process.
     * @returns A JavaScript object like { "@id": <id>, "@type": <type>[, other...]}
     */
    private exportSemanticObjectIdAndType(semanticObject: Semanticable): object {
        let result: any = {};
        result['@id'] = semanticObject.getSemanticId();
        result['@type'] = semanticObject.getSemanticType();
        return result;
    }

    /**
     * Returns a simple JavaScript object containing an array of 
     * semantic objects.
     * 
     * @param collection The collection of semantic objects to process.
     * @returns A JavaScript object like { <currentName>: [array of objects]}.
     */
    private exportCollection(name: string, values: IterableIterator<string | number | boolean | Semanticable>): object {
        let result: any = {};
        let collection: Array<string | number | boolean | Semanticable> = [];

        let iteratorResult: IteratorResult<string | number | boolean | Semanticable> = values.next();
        const first: string | number | boolean | Semanticable = iteratorResult.value;

        if (!iteratorResult.done) {
            if ([ 'string', 'number', 'boolean' ].includes(typeof first)) {
                collection = Array.from(values);
            }

            else {
                // @ts-ignore
                let item: Semanticable = first;

                while (!iteratorResult.done) {
                    collection.push(item.getSemanticId() ?? 'unknown');
                    iteratorResult = values.next();
                    item = iteratorResult.value;
                }
            }
        }

        result[name] = collection;
        return result;
    }

    /**
     * Returns a simple JavaScript object associating the constant name to 
     * its value.
     * 
     * @param subject The Constant or Value to process.
     * @returns A JavaScript object like { <name>: <value> }.
     */
    private exportPrimitive(name: string, value: string | number | boolean): object {
        let result: any = {};
        result[name] = value;
        return result;
    }

    private exportSemanticable(name: string, semanticObject: Semanticable): object {
        let result: any = {};
        result[name] = semanticObject.getSemanticId();
        return result;
    }

}