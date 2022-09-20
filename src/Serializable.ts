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

import Serializer from "./Serializer";

/**
 * This interface allows an object to be serialized: exported to 
 * a particular output format, like JSON-LD for instance.
 */
export default interface Serializable {

    /**
     * Serializes the current object thanks to a dedicated Serializer.
     * @param serializer The Serializer object to use to serialize this object.
     * @see The Serializer interface.
     */
    serialize(serializer: Serializer<any>): any;

}