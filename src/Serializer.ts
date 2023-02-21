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

import Semanticable from './Semanticable';

/**
 * This interface defines the object that will effectively 
 * serialize an object that implements the Serializable interface.
 * 
 * The process method runs the particular algorythm used to 
 * serialize the object. It generaly iterates thougth the semantic 
 * properties of the object.
 * 
 * For instance, the ObjectSerializer serializes a Semanticable as 
 * a plain object.
 * 
 * @see The Serializable interface.
 * @see The ObjectSerializer class.
 */
export default interface Serializer<Output> {

    /**
     * This method applies this serializer algorythm to the specified subject 
     * and return the result.
     * 
     * @param subject The object to serialize.
     */
    process(subject: Semanticable): Output;

}