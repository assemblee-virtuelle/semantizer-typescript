import SemanticObject from '../lib/SemanticObject.js';

test('semantic id', () => {
    const id = "http://platform.com/object1";

    const semanticObject = new SemanticObject({ semanticId: id, semanticType: "" });

    expect(semanticObject.getSemanticId()).toStrictEqual(id);
});

test('semantic type', () => {
    const type = "http://example.org/type";

    const semanticObject = new SemanticObject({ semanticId: "http://platform.com/object1", semanticType: type });

    expect(semanticObject.getSemanticType()).toStrictEqual(type);
});

test('from dataset', () => {
    const id = "http://platform.com/object1";
    const type = "http://example.org/type";

    const semanticObjectModel = new SemanticObject({ semanticId: id, semanticType: type });
    const semanticObjectModelDataset = semanticObjectModel.toRdfDatasetExt();

    const semanticObject = new SemanticObject({ semanticId: "", semanticType: "" });
    semanticObject.setSemanticPropertyAllFromRdfDataset(semanticObjectModelDataset);

    expect(semanticObject.getSemanticId()).toStrictEqual(id);
    expect(semanticObject.getSemanticType()).toStrictEqual(type);
});

test('equals', () => {
    const id = "http://platform.com/object1";
    const type = "http://example.org/type";

    const semanticObject1 = new SemanticObject({ semanticId: id, semanticType: type });

    const semanticObject2 = new SemanticObject({ semanticId: id, semanticType: type });

    const semanticObject3 = new SemanticObject({ semanticId: id + 'differs', semanticType: type });

    const semanticObject4 = new SemanticObject({ semanticId: id, semanticType: type + 'differs' });

    expect(semanticObject1.equals(semanticObject2)).toStrictEqual(true);
    expect(semanticObject1.equals(semanticObject3)).toStrictEqual(false);
    expect(semanticObject1.equals(semanticObject4)).toStrictEqual(false);
});
