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

import Edgeable from "./Edgeable";

/**
 * This interface represents a node in a graph. Nodes are 
 * connected to each other with edges. The Semantizer library 
 * constructs a graph of semantic properties and objects as 
 * a way to store and access data.
 */
export default interface Nodeable {

    /**
     * Gives the ability to iterate over the edges stored by the 
     * current object.
     * 
     * @return an Itereator of Edgeable.
     * @see The Edgeable interface.
     */
    getEdges(): IterableIterator<Edgeable>;

    /**
     * Returns the Edgeable object corresponding to the name. When we 
     * register a semantic property, a new Edge associated to a name (URI) 
     * is created. This method allows to retrieve an Edge given its name.
     * 
     * @param name The name of the Edgeable object to retrieve.
     * @throws Error if this object can't hold edges.
     * 
     * @see The Semanticable interface.
     */
    getEdgeByName(name: string): Edgeable | undefined;

}