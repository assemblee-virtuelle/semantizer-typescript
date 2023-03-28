Semantizer is a library to easily build objects that can be represented as RDF datasets. It is built on top of RDFJS.

This library was writen for the [Data Food Consortium](https://datafoodconsortium.org) project (DFC) which aims to provide interoperability between food supply chain platforms. We use the semantizer library inside our connector library to help developers to exchange data expressed with the DFC ontology.

# Get started
Lets take an example, with a simple Address and Person classes:

```JS
class Address extends SemanticObject {
  
    constructor(name: string, country: string) {
        super({
            semanticId: "http://myplatform.com/address/" + name,
            semanticType: "https://schema.org/PostalAddress"
        });
        this.setSemanticPropertyLiteral("https://schema.org/addressCountry", country);
    }

    public getCountry(): string {
        return this.getSemanticProperty("https://schema.org/addressCountry");
    }
}

class Person extends SemanticObject {

    constructor(name: string, address: Address) {
        super({
            semanticId: "http://myplatform.com/person/" + name,
            semanticType: "https://schema.org/Person"
        });
        this.setName(name);
        this.setAddress(address);
    }

    public getAddress(): Address {
        return this.getSemanticProperty("https://schema.org/address");
    }

    public getName(): string {
        return this.getSemanticProperty("https://schema.org/givenName");
    }

    public setAddress(address: Address): string {
        this.setSemanticPropertyReference("https://schema.org/address", address);
    }

    public setName(name: string): string {
        this.setSemanticPropertyLiteral("https://schema.org/givenName", name);
    }

}
```

You can access the properties:
```JS
const address = new Address("adr1", "France");
const person = new Person("John", address);

console.log(person.getName()); // => John
console.log(person.getAddress().getCountry()); // => France
```

You can get a RDF dataset using the `toRdfDatasetExt()` method.

You can also set all the properties from a RDF dataset with the `setSemanticPropertyAllFromRdfDataset(dataset: DatasetExt)` method.