import SemanticObjectMap from '../lib/semantic-object-map/SemanticObjectMap.js';

test('add semantic property', async () => {
    const semanticObject = new SemanticObjectMap();

    semanticObject.addSemanticProperty("prop1", "Person");
    semanticObject.addSemanticProperty("prop2", true);
    semanticObject.addSemanticProperty("prop3", 3);

    expect(await semanticObject.getSemanticPropertyValue("prop1")).toStrictEqual("Person");
    expect(await semanticObject.getSemanticPropertyValue("prop2")).toStrictEqual(true);
    expect(await semanticObject.getSemanticPropertyValue("prop3")).toStrictEqual(3);
    expect(await semanticObject.getSemanticPropertyValue("prop4")).toStrictEqual(undefined);
});

test('set semantic property', async () => {
    const semanticObject = new SemanticObjectMap();

    semanticObject.addSemanticProperty("prop1", "Person");
    semanticObject.addSemanticProperty("prop2", true);
    semanticObject.addSemanticProperty("prop3", 3);

    expect(await semanticObject.getSemanticPropertyValue("prop1")).toStrictEqual("Person");
    expect(await semanticObject.getSemanticPropertyValue("prop2")).toStrictEqual(true);
    expect(await semanticObject.getSemanticPropertyValue("prop3")).toStrictEqual(3);

    semanticObject.setSemanticProperty("prop1", "Person", "Person2");
    semanticObject.setSemanticProperty("prop2", true, false);
    semanticObject.setSemanticProperty("prop3", 3, 4);

    expect(await semanticObject.getSemanticPropertyValue("prop1")).toStrictEqual("Person2");
    expect(await semanticObject.getSemanticPropertyValue("prop2")).toStrictEqual(false);
    expect(await semanticObject.getSemanticPropertyValue("prop3")).toStrictEqual(4);
});

test('remove semantic property', async () => {
    const semanticObject = new SemanticObjectMap();

    semanticObject.addSemanticProperty("prop1", "Person");
    semanticObject.addSemanticProperty("prop2", true);
    semanticObject.addSemanticProperty("prop3", 3);

    expect(await semanticObject.getSemanticPropertyValue("prop1")).toStrictEqual("Person");
    expect(await semanticObject.getSemanticPropertyValue("prop2")).toStrictEqual(true);
    expect(await semanticObject.getSemanticPropertyValue("prop3")).toStrictEqual(3);

    semanticObject.removeSemanticProperty("prop1", "Person");

    expect(await semanticObject.getSemanticPropertyValue("prop1")).toStrictEqual(undefined);
    expect(await semanticObject.getSemanticPropertyValue("prop2")).toStrictEqual(true);
    expect(await semanticObject.getSemanticPropertyValue("prop3")).toStrictEqual(3);
});

test('add semantic property multiple', async () => {
    const semanticObject = new SemanticObjectMap();

    semanticObject.addSemanticProperty("prop1", "Jean");
    semanticObject.addSemanticProperty("prop2", true);
    semanticObject.addSemanticProperty("prop1", "Marie");

    expect(await semanticObject.getSemanticPropertyValue("prop1")).toStrictEqual("Jean");
    expect(await semanticObject.getSemanticPropertyValue("prop2")).toStrictEqual(true);
    expect(await semanticObject.getSemanticPropertyValueAll("prop1")).toStrictEqual(["Jean", "Marie"]);
});


/*
test('semantic property reference', async () => {
    const referenced = new SemanticObjectMap();
    referenced.addSemanticProperty("name", "value");

    const reference = new SemanticObjectMap({store: store});
    reference.addSemanticProperty("reference", referenced);

    const tested = await reference.getSemanticPropertyValue("reference");

    expect(tested).toStrictEqual(referenced);
    expect(await tested.getSemanticPropertyValue("name")).toStrictEqual("value");
});

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