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

import Semanticable from "./Semanticable";

/**
 * This interface represents an edge in a graph. Nodes are 
 * connected to each other with edges. The Semantizer library 
 * constructs a graph of semantic properties and objects as 
 * a way to store and access data.
 * 
 * An Edge associates a target to a name. The name stores the 
 * URI while the target points to the node associated to this 
 * edge.
 * 
 * For example, when registering a new semantic property, says 
 * the foaf:name of a person object, a new Edge is created like 
 * new Edge("http://xmlns.com/foaf/0.1/name", new Value("John")).
 */
export default interface Edgeable {

    /**
     * Returns the name of the Edge.
     */
    getName(): string;

    /**
     * Returs the target of the Edge.
     */
    getTarget(): Semanticable;
    
}