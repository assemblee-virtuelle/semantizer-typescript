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
import Constant from './Constant.js';
import Collection from "./Collection.js";
import Value from './Value.js';
import Reference from './Reference.js';
import SemanticObject from './SemanticObject.js';
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

    /**
     * This name is used to save as a temporary value the name of 
     * the current object being processed.
     */
    protected currentName: string;

    constructor() {
        this.currentName = '';
    }

    public process(subject: SemanticObject | Reference | Collection | Constant | Value | Semanticable): object {
        if (subject instanceof SemanticObject || subject instanceof Reference)
            return this.exportSemanticObject(subject);

        if (subject instanceof Collection)
            return this.exportCollection(subject);
        
        if (subject instanceof Constant || subject instanceof Value)
            return this.exportConstantOrValue(subject);
        
        throw new Error("Specified subject is not serializable.");
    }

    /**
     * Returns a simple JavaScript object containing the "@id", 
     * the "@type" and the children of the specified object.
     * 
     * @param semanticObject The object or reference to process.
     * @returns A JavaScript object like { "@id": <id>, "@type": <type>[, other...]}
     */
    private exportSemanticObject(semanticObject: SemanticObject | Reference): object {
        let result: any = {};
        result['@id'] = semanticObject.getSemanticId();
        result['@type'] = semanticObject.getSemanticType();
        result = { ...result, ...this.exportChildren(semanticObject) };
        return result;
    }

    /**
     * Returns a simple JavaScript object containing an array of 
     * semantic objects.
     * 
     * @param collection The collection of semantic objects to process.
     * @returns A JavaScript object like { <currentName>: [array of objects]}.
     */
    private exportCollection(collection: Collection): object {
        let result: any = {};
        let values = [];
        for (let child of collection.getChildren())
            values.push(child.getSemanticId());
        result[this.currentName] = values;
        return result;
    }

    /**
     * Returns a simple JavaScript object associating the constant name to 
     * its value.
     * 
     * @param subject The Constant or Value to process.
     * @returns A JavaScript object like { <name>: <value> }.
     */
    private exportConstantOrValue(subject: Constant | Value): object {
        let result: any = {};
        result[this.currentName] = subject.getValue();
        return result;
    }

    /**
     * Iterate over the children of the specified object to process each one.
     * In case of a reference, it only export the "@id" property of the child.
     * 
     * @param object The object to iterate over.
     * @returns A JavaScript object like { <name>: <value> }.
     */
    private exportChildren(object: Semanticable): object {
        let result: any = {};

        for (let edge of object.getEdges()) {

            let child: Semanticable = edge.getTarget();
            this.currentName = edge.getName();
            
            // If the child is a reference, we just export the id
            if (child.isReference()) {
                try { result[this.currentName] = child.getSemanticId(); }
                catch(e) { result[this.currentName] = 'unknown'; }
            }

            else result = { ...result, ...this.process(child) }; // recursive call
        }

        return result;
    }

}