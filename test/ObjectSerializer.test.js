/*import ObjectSerializer from '../lib/ObjectSerializer.js';
import SemanticObject from '../lib/SemanticObject.js';

const getBasicPerson = () => {
    const basicPerson = new SemanticObject;
    basicPerson.setSemanticId("http://platform.example/John");
    basicPerson.setSemanticType("http://xmlns.com/foaf/0.1/Person");
    basicPerson.registerSemanticProperty("http://xmlns.com/foaf/0.1/name", () => "John");
    return basicPerson;
}

const basicExpect = {
    "@id": "http://platform.example/John",
    "@type": "http://xmlns.com/foaf/0.1/Person",
    "http://xmlns.com/foaf/0.1/name": "John"
};

const serializer = new ObjectSerializer;

test('serialize basic object', () => {
    const serialized = getBasicPerson().serialize(serializer);
    expect(serialized).toStrictEqual(basicExpect);
});

test('serialize referenced object', () => {
    const expected = { 
        ...basicExpect, 
        "object": "objectId"
    };

    const referencedObject = new SemanticObject;
    referencedObject.setSemanticId("objectId");
    referencedObject.setSemanticType("objectType");
    referencedObject.registerSemanticProperty("property", () => "propertyValue");

    const person = getBasicPerson();
    person.registerSemanticProperty("object", () => referencedObject);

    const serialized = person.serialize(serializer);
    expect(serialized).toStrictEqual(expected);
});

test('serialize referenced object collection', () => {
    const expected = { 
        ...basicExpect, 
        "objects": [ "objectId1", "objectId2" ]
    };

    const referencedObject1 = new SemanticObject;
    referencedObject1.setSemanticId("objectId1");
    referencedObject1.setSemanticType("objectType1");
    referencedObject1.registerSemanticProperty("property1", () => "propertyValue1");

    const referencedObject2 = new SemanticObject;
    referencedObject2.setSemanticId("objectId2");
    referencedObject2.setSemanticType("objectType2");
    referencedObject2.registerSemanticProperty("property2", () => "propertyValue2");

    const person = getBasicPerson();
    person.registerSemanticProperty("objects", () => [ referencedObject1, referencedObject2 ]);

    const serialized = person.serialize(serializer);
    expect(serialized).toStrictEqual(expected);
});

test('serialize blank node', () => {
    const expected = { 
        ...basicExpect, 
        "blankNode": { 
            "@type": "blankNodeType",
            "property": "propertyValue"
        }
    };

    const blankNode = new SemanticObject;
    blankNode.setSemanticType("blankNodeType");
    blankNode.registerSemanticProperty("property", () => "propertyValue");

    const person = getBasicPerson();
    person.registerSemanticProperty("blankNode", () => blankNode);

    const serialized = person.serialize(serializer);
    expect(serialized).toStrictEqual(expected);
});

test('serialize blank node collection', () => {
    const expected = { 
        ...basicExpect, 
        "blankNodes": [
            { 
                "@type": "blankNodeType1",
                "property1": "propertyValue1"
            },
            { 
                "@type": "blankNodeType2",
                "property2": "propertyValue2"
            }
        ]
    };

    const blankNode1 = new SemanticObject;
    blankNode1.setSemanticType("blankNodeType1");
    blankNode1.registerSemanticProperty("property1", () => "propertyValue1");

    const blankNode2 = new SemanticObject;
    blankNode2.setSemanticType("blankNodeType2");
    blankNode2.registerSemanticProperty("property2", () => "propertyValue2");

    const person = getBasicPerson();
    person.registerSemanticProperty("blankNodes", () => [ blankNode1, blankNode2 ]);

    const serialized = person.serialize(serializer);
    expect(serialized).toStrictEqual(expected);
});

test('serialize primitive collection', () => {
    const expected = { 
        ...basicExpect, 
        "primitives": [ 1, 2, 3 ]
    };

    const person = getBasicPerson();
    person.registerSemanticProperty("primitives", () => [ 1, 2, 3 ]);

    const serialized = person.serialize(serializer);
    expect(serialized).toStrictEqual(expected);
});
*/

test('serialize primitive collection', () => {});