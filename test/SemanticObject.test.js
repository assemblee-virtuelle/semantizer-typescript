import SemanticObjectDefault from '../lib/core/SemanticObjectDefault.js';

test('add semantic property', () => {
    const semanticObject = new SemanticObjectDefault();

    semanticObject.addSemanticProperty("prop1", "Person");
    semanticObject.addSemanticProperty("prop2", true);
    semanticObject.addSemanticProperty("prop3", 3);

    expect(semanticObject.getSemanticProperty("prop1")).toStrictEqual("Person");
    expect(semanticObject.getSemanticProperty("prop2")).toStrictEqual(true);
    expect(semanticObject.getSemanticProperty("prop3")).toStrictEqual(3);
    expect(semanticObject.getSemanticProperty("prop4")).toStrictEqual(undefined);
});

test('set semantic property', () => {
    const semanticObject = new SemanticObjectDefault();

    semanticObject.addSemanticProperty("prop1", "Person");
    semanticObject.addSemanticProperty("prop2", true);
    semanticObject.addSemanticProperty("prop3", 3);

    expect(semanticObject.getSemanticProperty("prop1")).toStrictEqual("Person");
    expect(semanticObject.getSemanticProperty("prop2")).toStrictEqual(true);
    expect(semanticObject.getSemanticProperty("prop3")).toStrictEqual(3);

    semanticObject.setSemanticProperty("prop1", "Person2", "Person");
    semanticObject.setSemanticProperty("prop2", false, true);
    semanticObject.setSemanticProperty("prop3", 4, 3);

    expect(semanticObject.getSemanticProperty("prop1")).toStrictEqual("Person2");
    expect(semanticObject.getSemanticProperty("prop2")).toStrictEqual(false);
    expect(semanticObject.getSemanticProperty("prop3")).toStrictEqual(4);
});

test('remove semantic property', () => {
    const semanticObject = new SemanticObjectDefault();

    semanticObject.addSemanticProperty("prop1", "Person");
    semanticObject.addSemanticProperty("prop2", true);
    semanticObject.addSemanticProperty("prop3", 3);

    expect(semanticObject.getSemanticProperty("prop1")).toStrictEqual("Person");
    expect(semanticObject.getSemanticProperty("prop2")).toStrictEqual(true);
    expect(semanticObject.getSemanticProperty("prop3")).toStrictEqual(3);

    semanticObject.removeSemanticProperty("prop1", "Person");

    expect(semanticObject.getSemanticProperty("prop1")).toStrictEqual(undefined);
    expect(semanticObject.getSemanticProperty("prop2")).toStrictEqual(true);
    expect(semanticObject.getSemanticProperty("prop3")).toStrictEqual(3);
});

test('add semantic property multiple', () => {
    const semanticObject = new SemanticObjectDefault();

    semanticObject.addSemanticProperty("prop1", "Jean");
    semanticObject.addSemanticProperty("prop2", true);
    semanticObject.addSemanticProperty("prop1", "Marie");

    expect(semanticObject.getSemanticProperty("prop1")).toStrictEqual("Jean");
    expect(semanticObject.getSemanticProperty("prop2")).toStrictEqual(true);
    expect(semanticObject.getSemanticPropertyAll("prop1")).toStrictEqual(["Jean", "Marie"]);
});


/*
test('semantic property reference', async () => {
    const referenced = new SemanticObjectMap();
    referenced.addSemanticProperty("name", "value");

    const reference = new SemanticObjectMap({store: store});
    reference.addSemanticProperty("reference", referenced);

    const tested = await reference.getSemanticProperty("reference");

    expect(tested).toStrictEqual(referenced);
    expect(await tested.getSemanticProperty("name")).toStrictEqual("value");
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