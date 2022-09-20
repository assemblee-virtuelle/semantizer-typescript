import ObjectSerializer from '../lib/ObjectSerializer.js';
import SemanticObject from '../lib/SemanticObject.js';

let person = new SemanticObject;
person.setSemanticId("testId");
person.setSemanticType("testType");

let expected = {
    "@id": "testId",
    "@type": "testType"
};

test('serialize id and type', () => {
    let serialized = person.serialize(new ObjectSerializer);
    expect(serialized).toStrictEqual(expected);
});

test('serialize constant', () => {
    person.registerSemanticConstant("constantURI", "constantValue");
    expected["constantURI"] = "constantValue";
    let serialized = person.serialize(new ObjectSerializer);
    expect(serialized).toStrictEqual(expected);
});

test('serialize value', () => {
    let getter = () => { return "constantValue" };
    person.registerSemanticValue("constantURI", getter);
    expected["constantURI"] = "constantValue";
    let serialized = person.serialize(new ObjectSerializer);
    expect(serialized).toStrictEqual(expected);
});

test('serialize collection', () => {
    let address1 = new SemanticObject("address1Id", "addressType");
    let address2 = new SemanticObject("address2Id", "addressType");
    let collection = [
        address1,
        address2
    ]
    person.registerSemanticCollection("addresses", collection);
    expected["addresses"] = [
        "address1Id",
        "address2Id"
    ];
    let serialized = person.serialize(new ObjectSerializer);
    expect(serialized).toStrictEqual(expected);
});

test('serialize reference', () => {
    let reference = new SemanticObject("referenceId", "referenceType");
    person.registerSemanticReference("referenceURI", reference);
    expected["referenceURI"] = "referenceId";
    let serialized = person.serialize(new ObjectSerializer);
    expect(serialized).toStrictEqual(expected);
});