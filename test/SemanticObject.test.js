import SemanticObject from '../lib/object/SemanticObject.js';
import SemanticProperty from '../lib/property/SemanticProperty.js';
import StoreMapSemanticable from '../lib/store/StoreMapSemanticable.js';

test('get semantic property literal', async () => {
    const store = new StoreMapSemanticable();
    const semanticObject = new SemanticObject({store: store});
    semanticObject.addSemanticProperty("rdfs:type", "Person");
    semanticObject.addSemanticProperty("dfc:name", "Jean");

    expect(await semanticObject.getSemanticProperty("rdfs:type")).toStrictEqual("Person");
    expect(await semanticObject.getSemanticProperty("dfc:name")).toStrictEqual("Jean");
});

test('get semantic property reference', async () => {
    const store = new StoreMapSemanticable();

    const referenced = new SemanticObject({store: store});
    referenced.addSemanticProperty("name", "value");

    const reference = new SemanticObject({store: store});
    reference.addSemanticProperty("reference", referenced);

    const tested = await reference.getSemanticProperty("reference");

    expect(tested).toStrictEqual(referenced);
    expect(await tested.getSemanticProperty("name")).toStrictEqual("value");
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