import SemanticObjectMap from '../lib/semantic-object-map/SemanticObjectMap.js';

test('semantic property string', async () => {
    const semanticObject = new SemanticObjectMap();

    semanticObject.addSemanticProperty("prop1", "Person");
    semanticObject.addSemanticProperty("prop2", "Jean");

    expect(await semanticObject.getSemanticPropertyValue("prop1")).toStrictEqual("Person");
    expect(await semanticObject.getSemanticPropertyValue("prop2")).toStrictEqual("Jean");
});

test('semantic property boolean', async () => {
    const semanticObject = new SemanticObjectMap();
    semanticObject.addSemanticProperty("prop1", true);
    semanticObject.addSemanticProperty("prop2", false);

    expect(await semanticObject.getSemanticPropertyValue("prop1")).toStrictEqual("true");
    expect(await semanticObject.getSemanticPropertyValue("prop2")).toStrictEqual("false");
});

test('semantic property number', async () => {
    const semanticObject = new SemanticObjectMap();
    semanticObject.addSemanticProperty("prop1", 1);
    semanticObject.addSemanticProperty("prop2", 2);

    expect(await semanticObject.getSemanticPropertyValue("prop1")).toStrictEqual("1");
    expect(await semanticObject.getSemanticPropertyValue("prop2")).toStrictEqual("2");
});

test('semantic property reference', async () => {
    const referenced = new SemanticObjectMap();
    referenced.addSemanticProperty("name", "value");

    const reference = new SemanticObjectMap({store: store});
    reference.addSemanticProperty("reference", referenced);

    const tested = await reference.getSemanticPropertyValue("reference");

    expect(tested).toStrictEqual(referenced);
    expect(await tested.getSemanticPropertyValue("name")).toStrictEqual("value");
});

/*
test('local uuid', async () => {
    const semanticObject = new SemanticObject();
    expect(semanticObject.getSemanticId()).toStrictEqual("local://uuid");
});

test('local ref', async () => {
    const semanticObject = new SemanticObject();
    expect(semanticObject.getSemanticId()).toStrictEqual("local://uuid");
});

/*
test('semantic type', () => {
    const type = "http://example.org/type";

    const semanticObject = new SemanticObject("http://platform.com/object1");
    semanticObject.setSemanticType(type);

    expect(semanticObject.getSemanticType()).toStrictEqual(type);
});

test('from dataset', () => {
    const id = "http://platform.com/object1";
    const type = "http://example.org/type";

    const semanticObjectModel = new SemanticObject(id);
    semanticObjectModel.setSemanticType(type);
    const semanticObjectModelDataset = semanticObjectModel.toRdfDataset();

    const semanticObject = new SemanticObject("");
    semanticObject.setSemanticPropertyAllFromRdfDataset(semanticObjectModelDataset);

    expect(semanticObject.getSemanticId()).toStrictEqual(id);
    expect(semanticObject.getSemanticType()).toStrictEqual(type);
});

test('equals', () => {
    const id = "http://platform.com/object1";
    const type = "http://example.org/type";

    const semanticObject1 = new SemanticObject(id);
    semanticObject1.setSemanticType(type);

    const semanticObject2 = new SemanticObject(id);
    semanticObject2.setSemanticType(type);

    const semanticObject3 = new SemanticObject(id + 'differs');
    semanticObject3.setSemanticType(type);

    const semanticObject4 = new SemanticObject(id);
    semanticObject4.setSemanticType(type + 'differs');

    expect(semanticObject1.equals(semanticObject2)).toStrictEqual(true);
    expect(semanticObject1.equals(semanticObject3)).toStrictEqual(false);
    expect(semanticObject1.equals(semanticObject4)).toStrictEqual(false);
});
*/