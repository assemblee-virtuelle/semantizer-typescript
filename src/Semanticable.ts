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
export default interface Semanticable extends Serializable {

    /**
     * Getter for the semantic property "@id". It should return the 
     * URI of this object. If the semantic "@id" property is undefined 
     * the object should be considered as a blank node.
     * @return the semantic id of this object or undefined in case of 
     * a blank node.
     * @see the function Semanticable:isBlankNode
     */
    getSemanticId(): string | undefined;

    /**
     * Getter for the semantic property "@type".
     */
    getSemanticType(): string | undefined;

    /**
     * Getter for the semantic properties of this object.
     * @return an interator to walk through the properties.
     */
    getSemanticProperties(): IterableIterator<Propertyable>;
    
    /**
     * Given its name, gives the value of a semantic property this object has. 
     * @param name the name of the semantic property to get the value of.
     */
    getSemanticPropertyValue(name: string): string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined;

    /**
     * Tells if this object is a blank node. A blank node is an unindentified object 
     * (it does not have any @id property).
     * @return whether this object is a blank node or not.
     */
    isBlankNode(): boolean;
    
    /**
     * Call this method to add a semantic property to this object.
     * 
     * @param name The name of the property. It should be an URI.
     * @param valueGetter The function to read the value from.
     */
    registerSemanticProperty(name: string, valueGetter: () => string | number | boolean | Semanticable | string[] | number[] | boolean[] | IterableIterator<Semanticable> | undefined): void;
    
    /**
     * Setter for the semantic property "@id". It registers a property 
     * for the "@id" name if necessary.
     */
    setSemanticId(id: string): void;

    /**
     * Setter for the semantic property "@type". It registers a property 
     * for the "@type" name if necessary.
     */
    setSemanticType(type: string): void;

}