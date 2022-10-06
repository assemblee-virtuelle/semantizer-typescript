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

import Propertyable from './Propertyable';
import Serializable from './Serializable';

/**
 * The Semanticable interface is the base class for semantic objects 
 * and properties. In case of a semantic object, it allows the object 
 * to register some semantic properties and to be serialized. In case 
 * of a semantic property, it allows the property to be serialized.
 * 
 * Wrapping semantic objects and properties within the same base interface 
 * allows us to parse them the same way. Indeed, semantic objects contains 
 * some semantic properties while semantic properties can contains other 
 * objects, like the Collection or the Reference classes.
 * 
 * Serialization is made thanks to a Serializer object. That object 
 * manages the way the object it processes must be serialized, for 
 * example to an output format like JSON-LD. You can use the dedicated 
 * serialize() method as a shortcut to serialize this object.
 * 
 * The base implementation of Semanticable is made through the SemanticObject 
 * class. Regarding properties, several types exist: the Reference, the 
 * Collection, the Constant and the Value.
 * 
 * @see the SemanticObject, base implementation class.
 * @see The Serializer interface, to manage serialization.
 */
export default interface Semanticable extends Serializable {

    /**
     * Getter for the semantic property "@id".
     * @throws Error if that object can't hold semantic properties. 
     */
    getSemanticId(): string | undefined;

    /**
     * Getter for the semantic property "@type".
     * @throws Error if that object can't hold semantic properties. 
     */
    getSemanticType(): string | undefined;

    getProperties(): IterableIterator<Propertyable>;
    getPropertyByName(name: string): Propertyable | undefined;

    /**
     * Call this method to add a semantic property of type "Value". 
     * A Value is a property that can change over time. The value is 
     * obtained by calling a function.
     * 
     * @param name The name of the property. It should be an URI.
     * @param valueGetter The function to read the value from.
     * @throws This object can not register a semantic property.
     * 
     * @see The Value class.
     */
    registerSemanticProperty(name: string, valueGetter: () => string | number | boolean | Semanticable | string[] | number[] | boolean[] | IterableIterator<Semanticable>): void;
    
    /**
     * Setter for the semantic property "@id". It registers a property 
     * for the "@id" name if necessary.
     * @throws Error if that object can't hold semantic properties. 
     */
    setSemanticId(id: string): void;

    /**
     * Setter for the semantic property "@type". It registers a property 
     * for the "@type" name if necessary.
     * @throws Error if that object can't hold semantic properties. 
     */
    setSemanticType(type: string): void;

}