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

import Collection from './Collection.js';
import Constant from './Constant.js';
import Reference from './Reference.js';
import Semanticable from './Semanticable';
import SemanticObject from './SemanticObject.js';
import Value from './Value.js';

/**
 * This interface defines the algorythm used to serialize an object 
 * that implements the Serializable interface.
 * 
 * @see The Serializable interface.
 */
export default interface Serializer<Output> {

    /**
     * This method applies this serializer algorythm to the specified subject 
     * and return the result.
     * 
     * @param subject The object to serialize.
     */
    process(subject: SemanticObject | Reference | Collection | Constant | Value | Semanticable): Output;

}