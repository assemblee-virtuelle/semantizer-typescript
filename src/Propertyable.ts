import Semanticable from "./Semanticable";

/**
 * This interface define semantic properties. They are used by a 
 * semantic object to store semantic data. A property associates 
 * a name (generally an URI) to a value getter function that gives 
 * the value of the Property.
 * 
 * For instance a FOAF Person may contain the following properties:
 * - "@id": "http://platform.example/John"
 * - "@type": "http://xmlns.com/foaf/0.1/Person"
 * - "http://xmlns.com/foaf/0.1/name": () => "John"
 */
export default interface Propertyable {

    /**
     * Gives the name of this property. It should be an URI or
     * a predefined semantic name like "@id" or "@type".
     * @return the name of the property.
     */
    getName(): string;

    /**
     * Gives the value of the property.
     * @return the value of the property.
     */
    getValue(): string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined;

}