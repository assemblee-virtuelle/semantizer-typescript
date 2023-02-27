import SemanticObject from '../lib/SemanticObject.js';

test('semantic id', () => {
    const id = "http://platform.com/object1";

    const semanticObject = new SemanticObject(id);

    expect(semanticObject.getSemanticId()).toStrictEqual(id);
});

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
