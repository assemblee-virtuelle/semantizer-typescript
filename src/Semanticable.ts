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

import Nodeable from './Nodeable';
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
export default interface Semanticable extends Nodeable, Serializable {

    /**
     * Some semantic objects are properties that point to an other object 
     * and act like it as the Reference class (proxy). In case of a 
     * reference property, this method gives the object that the property 
     * points to. If this object is not a reference property, the object 
     * will reference itself (return this).
     * 
     * @see isReference() method.
     * @see The Reference class.
     */
    getReferencedObject(): Semanticable;

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

    /**
     * This method is dedicated to semantic properties. In that case, 
     * this method will return the value of the property.
     * 
     * @see The Constant and Value classes.
     * 
     * @throws Error if that object can't hold semantic properties or
     * is not valuable. 
     */
    getValue(): string;
    
    /**
     * Some semantic objects are properties that point to an other object 
     * and act like it as the Reference class (proxy). In case of a 
     * reference property, this method tells if this object is a reference 
     * to another object (proxy).
     * 
     * @see The getReferencedObject() method and the Reference class.
     */
    isReference(): boolean;
    
    /**
     * Call this method to add a semantic property of type "Collection". 
     * Collection are a set of Semanticable objects.
     * 
     * @param name The name of the property. It should be an URI.
     * @param collection The Semanticable objects that the collection contains.
     * @throws This object can not register a semantic property.
     * 
     * @see The Collection class.
     */
    registerSemanticCollection(name: string, collection: Array<Semanticable>): void;

    /**
     * Call this method to add a semantic property of type "Constant". 
     * Constant are property that can't be unchanged.
     * 
     * @param name The name of the property. It should be an URI.
     * @param value The value of the property.
     * @throws This object can not register a semantic property.
     * 
     * @see The Constant class.
     */
    registerSemanticConstant(name: string, value: string): void;

    /**
     * Call this method to add a semantic property of type "Reference". 
     * A Reference is a property that points to an other object and act 
     * like it (proxy).
     * 
     * @param name The name of the property. It should be an URI.
     * @param object The Semanticable object the property points to.
     * @throws This object can not register a semantic property.
     * 
     * @see The Reference class.
     */
    registerSemanticReference(name: string, object: Semanticable): void;

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
    registerSemanticValue(name: string, valueGetter: Function): void;
    
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