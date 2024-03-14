import Semantizer from '../lib/Semantizer.js';
import SemanticObject from '../lib/SemanticObject.js';

test('semantic id', () => {
    const semantizer = new Semantizer();

    const id = "http://platform.com/object1";

    const semanticObject = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: id
    });

    expect(semanticObject.getSemanticId()).toStrictEqual(id);
});

test('semantic type', () => {
    const semantizer = new Semantizer();

    const type = "http://example.org/type";

    const semanticObject = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: "http://platform.com/object1", 
        semanticType: type 
    });

    expect(semanticObject.getSemanticType()).toStrictEqual(type);
});

test('are same type', () => {
    const semantizer = new Semantizer();

    const type = "http://example.org/type";

    const semanticObject1 = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: "http://platform.com/object1", 
        semanticType: type 
    });

    const semanticObject2 = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: "http://platform.com/object2", 
        semanticType: type 
    });

    expect(semanticObject1.isSemanticSameTypeOf(semanticObject2)).toStrictEqual(true);
});

test('are same type with context', () => {
    const context = { "ex": "http://example.org#" };
    const semantizer = new Semantizer(context);

    const type = "http://example.org#Type";

    const semanticObject1 = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: "http://platform.com/object1", 
        semanticType: type 
    });

    const semanticObject2 = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: "http://platform.com/object2", 
        semanticType: "ex:Type" 
    });

    expect(semanticObject1.isSemanticSameTypeOf(semanticObject2)).toStrictEqual(true);
});

test('semantic type without built in type setter', () => {
    const context = { "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#" };
    const semantizer = new Semantizer(context);

    const type = "http://example.org/type";

    const semanticObject = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: "http://platform.com/object1"
    });

    semanticObject.setSemanticPropertyReferenceId("rdf:type", type);

    expect(semanticObject.getSemanticType()).toStrictEqual(type);
});

test('use context', () => {
    const context = { "ex": "http://example.org#" };
    const semantizer = new Semantizer(context);
    const expandedType = "http://example.org#Example";
    const shortenedType = "ex:Example";
    const semanticObject = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: "http://platform.com/object1", 
        semanticType: expandedType 
    });
    expect(semanticObject.getSemanticType()).toStrictEqual(shortenedType);
});

test('use prefixed with missing context', () => {
    const semantizer = new Semantizer();
    const shortenedType = "ex:Example";
    const semanticObject = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: "http://platform.com/object1", 
        semanticType: shortenedType 
    });
    expect(semanticObject.getSemanticType()).toStrictEqual(shortenedType);
});

test('from dataset', () => {
    const semantizer = new Semantizer();

    const id = "http://platform.com/object1";
    const type = "http://example.org/type";

    const semanticObjectModel = new SemanticObject({ semantizer: semantizer, semanticId: id, semanticType: type });
    const semanticObjectModelDataset = semanticObjectModel.toRdfDatasetExt();

    const semanticObject = new SemanticObject({ 
        semantizer: semantizer, 
        semanticId: ""
    });
    semanticObject.setSemanticPropertyAllFromRdfDataset(semanticObjectModelDataset);

    expect(semanticObject.getSemanticId()).toStrictEqual(id);
    expect(semanticObject.getSemanticType()).toStrictEqual(type);
});

test('equals', () => {
    const context = { "ex": "http://example.org#" };
    const semantizer = new Semantizer(context);

    const id = "http://platform.com/object1";
    const type = "ex:Type";

    const semanticObject1 = new SemanticObject({ semantizer: semantizer, semanticId: id, semanticType: type });
    semanticObject1.addSemanticPropertyLiteral("ex:literal2", "literal2");
    semanticObject1.addSemanticPropertyLiteral("ex:literal", "literal");
    semanticObject1.addSemanticPropertyLiteral("ex:litera3", "01234");

    console.log(semanticObject1);

    const semanticObject2 = new SemanticObject({ semantizer: semantizer, semanticId: id, semanticType: type });
    semanticObject2.addSemanticPropertyLiteral("ex:literal", "literal");
    semanticObject2.addSemanticPropertyLiteral("ex:literal2", "literal2");
    semanticObject2.addSemanticPropertyLiteral("ex:litera3", "01234");

    console.log(semanticObject2);

    const semanticObject3 = new SemanticObject({ semantizer: semantizer, semanticId: id + 'differs', semanticType: type });

    const semanticObject4 = new SemanticObject({ semantizer: semantizer, semanticId: id, semanticType: type + 'differs' });

    expect(semanticObject1.equals(semanticObject2)).toStrictEqual(true);
    expect(semanticObject1.equals(semanticObject3)).toStrictEqual(false);
    expect(semanticObject1.equals(semanticObject4)).toStrictEqual(false);
});
