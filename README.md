Semantizer lets you enhance your object model with semantic data without breaking existing code. Just inherit from the `SemanticObject` class to get the ability to mark some properties of your object as "semantic". You can add to your object as any semantic properties as you want. These semantic properties can then be serialized to any output format, like JSON-LD.

This library was writen for the [Data Food Consortium](https://datafoodconsortium.org) project (DFC) which aims to provide interoperability between food supply chain platforms. We use the semantizer library inside our connector library to help developers to exchange JSON-LD data expressed with the DFC ontology.

# Get started
Lets take an example, with a simple Person class:

```
class Person {

    private name: string;

    constructor(name: string) {
        super(); // call SemanticObject constructor
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}
```

Inherit from the `SemanticObject` class and add this two following lines at the end of the constructor method:
```
this.setSemanticType("http://xmlns.com/foaf/0.1/Person");
this.registerSemanticValue("http://xmlns.com/foaf/0.1/name", () => this.getName());
```

The Person class should now looks like:
```
class Person extends SemanticObject {

    private name: string;

    constructor(name: string) {
        super(); // call SemanticObject constructor
        this.name = name;
        this.setSemanticType("http://xmlns.com/foaf/0.1/Person");
        this.registerSemanticValue("http://xmlns.com/foaf/0.1/name", () => this.getName());
    }

    public getName(): string {
        return this.name;
    }
}
```

Then you can serialize this object to a simple regular JavaScript object:
```
let person = new Person("John");
person.setSemanticId("http://platform.example/John");
let output = person.serialize(new ObjectSerializer));
```

`console.log(output)` will output:
```
{
  '@id': 'http://platform.example/John',
  '@type': 'http://xmlns.com/foaf/0.1/Person',
  'http://xmlns.com/foaf/0.1/name': 'John'
}
```

You can then use a library like [jsonld](https://github.com/digitalbazaar/jsonld.js) to add a semantic context like:
```
import jsonld from 'jsonld';

let context = {
    "foaf": "http://xmlns.com/foaf/0.1/"
};

const compacted = await jsonld.compact(output, context);
console.log(JSON.stringify(compacted, null, 2));
```

This will output a contextualized JSON-LD text:
```
{
  "@context": {
    "foaf": "http://xmlns.com/foaf/0.1/"
  },
  "@id": "http://platform.example/John",
  "@type": "foaf:Person",
  "foaf:name": "John"
}
```