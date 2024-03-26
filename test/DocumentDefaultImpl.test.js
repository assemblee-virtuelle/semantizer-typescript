import expect from 'node:assert';
import { test } from 'node:test';
import rdf from 'rdf-ext';
import SemantizerDefault from "../lib/SemantizerDefault.js";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'readable-stream';

const semantizer = new SemantizerDefault();

test("DocumentDefaultImpl:createWithoutUri", () => {
    let document = semantizer.createDocument();
    expect.strictEqual(document.getUri(), "");
});

test("DocumentDefaultImpl:createWithUri", () => {
    let document = semantizer.createDocument("http://example.org/document");
    expect.strictEqual(document.getUri(), "http://example.org/document");
})

test("DocumentDefaultImpl:isEmpty", () => {
    let document = semantizer.createDocument();
    expect.strictEqual(document.isEmpty(), true);
    document.createThingToSelfDescribe();
    expect.strictEqual(document.isEmpty(), false);

    document = semantizer.createDocument();
    document.createThing();
    expect.strictEqual(document.isEmpty(), false);

    document = semantizer.createDocument();
    document.createThingWithoutUri();
    expect.strictEqual(document.isEmpty(), false);
});

test("DocumentDefaultImpl:countThings", () => {
    let document = semantizer.createDocument();
    expect.strictEqual(document.countThings(), 0);

    document.createThingToSelfDescribe();
    expect.strictEqual(document.countThings(), 1);

    document.createThing();
    expect.strictEqual(document.countThings(), 2);

    document.createThingWithoutUri();
    expect.strictEqual(document.countThings(), 3);
});

test("DocumentDefaultImpl:equals", () => {
    let document1 = semantizer.createDocument();
    let document2 = semantizer.createDocument();

    expect.strictEqual(document1.equals(document2), true);
    expect.strictEqual(document2.equals(document1), true);

    document1.createThingToSelfDescribe();
    expect.strictEqual(document1.equals(document2), false);
    expect.strictEqual(document2.equals(document1), false);

    document2.createThingToSelfDescribe();
    expect.strictEqual(document1.equals(document2), true);
    expect.strictEqual(document2.equals(document1), true);

    document1.createThing();
    expect.strictEqual(document1.equals(document2), false);
    expect.strictEqual(document2.equals(document1), false);

    document2.createThing();
    expect.strictEqual(document1.equals(document2), true);
    expect.strictEqual(document2.equals(document1), true);
});

test("DocumentDefaultImpl:addThing", () => {
    let document1 = semantizer.createDocument();
    let thing = document1.createThing().addStringStatement("predicate", "value");

    let document2 = semantizer.createDocument();
    document2.addThing(thing);
});

test("DocumentDefaultImpl:addDocument", () => {

});

test("DocumentDefaultImpl:getThing", () => {
    let document = semantizer.createDocument();
    expect.strictEqual(document.getThing(""), null);
    expect.strictEqual(document.getThing("someUri"), null);
    
    let thing1 = document.createThingToSelfDescribe();
    expect.strictEqual(document.getThing(""), thing1);

    let thing2 = document.createThing();
    expect.strictEqual(document.getThing(""), thing1);
});

test("DocumentDefaultImpl:getThingsAll", () => {

});

test("DocumentDefaultImpl:getThingThatSelfDescribes", () => {
    let document = semantizer.createDocument();
    expect.strictEqual(document.getThingThatSelfDescribes(), null);

    const thingThatSelfDescribes = document.createThingToSelfDescribe();
    expect.strictEqual(document.getThingThatSelfDescribes(), thingThatSelfDescribes);
});

test("DocumentDefaultImpl:createThingToSelfDescribe", () => {
    let document = semantizer.createDocument();
    expect.strictEqual(document.getThingThatSelfDescribes(), null);

    const thingThatSelfDescribes = document.createThingToSelfDescribe();
    expect.strictEqual(document.getThingThatSelfDescribes(), thingThatSelfDescribes);

    // test throws
});

test("DocumentDefaultImpl:createThing", () => {

});

test("DocumentDefaultImpl:createThingWithoutUri", () => {
    const document = semantizer.createDocument("http://example.org/document");
    const bn = document.createThingWithoutUri("blank").addStringStatement("anonymous", "string");
});

test("DocumentDefaultImpl:deleteThing", () => {

});

test("DocumentDefaultImpl:hasStatementsAbout", () => {

});

test("DocumentDefaultImpl:filter", () => {

});

test("DocumentDefaultImpl:toRdfDatasetExt", () => {

});

test("DocumentDefaultImpl:create", () => {
    let document = semantizer.createDocument("http://example.org/document");
    expect.strictEqual(document.getUri(), "http://example.org/document");

    const metaData = document.createThingToSelfDescribe();
    metaData.addRdfTypeStatement("ex:DocumentType");
    expect.strictEqual(metaData.getUri(), "http://example.org/document");
    expect.strictEqual(metaData.getRdfTypeValue(), "ex:DocumentType");

    const personDocument = semantizer.createDocument();
    const person = personDocument.createThingToSelfDescribe()
        .addRdfTypeStatement("dfc-b:Person");
        /*.addStatement("dfc-b:hasAddres", 
            personDocument.createThing("adr")
                .addRdfTypeStatement("dfc-b:Address")
                .addStringStatement("dfc-b:hasCountry", "France")
        );*/
    
    const address = personDocument.createThingWithoutUri().addRdfTypeStatement("dfc-b:Address");
    person.addStatement("dfc-b:hasAddress", address);

    //console.log(personDocument.toRdfDatasetExt());

    // person.addStatementAnonymous("dfc-b:hasAddress").addRdfTypeStatement("dfc-b:Address"); // raccourci

    // const anonymThing = catalog.addAnonymousStatement("ex:blankNodeProp", "nameHintLikeaddress" | address (Thing | Document), ?nameHint);
    // anonymThing.addRdfTypeStatement("dfc-b:Address");

    // catalog.createAnonymousThing()

    // le blank node est ajouté au document mais n'a pas de sens s'il n'est pas relié à 
    // au moins une chose du document ?

    const thingWithourName = document.createThing().addStringStatement("dfc-b:name", "Without name");

    const extern = document.createThing("http://wikipedia.org/ExternalSubject").addStringStatement("dfc-b:name", "External");

    /*document.addRdfTypeStatement("ex:Type2");
    expect.strictEqual(document.getFirstRdfTypeValue(), "ex:Type");

    const semanticTypes = document.getAllRdfTypeValues();
    expect.strictEqual(semanticTypes.length, 2);
    expect.strictEqual(semanticTypes[0], "ex:Type");
    expect.strictEqual(semanticTypes[1], "ex:Type2");*/

    //console.log(document.toRdfDatasetExt());

    const serializer = new SerializerJsonld({ compact: true }); //, context: context });

    const input = new Readable({
        objectMode: true,
        read: () => {
            //semanticObjets.forEach((semanticObject) => semanticObject.toRdfDatasetExt().forEach((quad) => input.push(quad)));
            personDocument.toRdfDatasetExt().forEach((quad) => input.push(quad));
            input.push(null)
        }
    });

    const output = serializer.import(input);

    //output.on("data", (json) => console.log(JSON.stringify(json)));
});

/*test("DocumentDefaultImpl:create", () => {
    const document = semantizer.createDocument();
    expect.strictEqual(document.getSemanticId(), "");

    const property = "http://example.org/property";
    const value = "value"
    document.addStringStatementAbout(property, value);
    expect.strictEqual(document.getFirstStringValueAboutStatement(property), value);
});*/

/*
test('DocumentDefaultImpl:export', () => {
    const resource = semantizer.createDocument({ 
        semanticId: "http://example.org/test",
        semanticType: "http://example.org/Type1"
    });
    resource.addValueForSemanticPropertyUrl("http://example.org/prop1", "http://example.org/value1");
    resource.addValueForSemanticPropertyString("http://example.org/prop2", "test");//, "fr");
    resource.addValueForSemanticPropertyInteger("http://example.org/propInteger", "3");
    //console.log(resource);

    const serializer = new SerializerJsonld({ compact: true }); //, context: context });

    const input = new Readable({
        objectMode: true,
        read: () => {
            //semanticObjets.forEach((semanticObject) => semanticObject.toRdfDatasetExt().forEach((quad) => input.push(quad)));
            resource.toRdfDatasetExt().forEach((quad) => input.push(quad));
            input.push(null)
        }
    });

    const output = serializer.import(input);

    //output.on("data", (json) => console.log(JSON.stringify(json)));

    const dataset = rdf.dataset();
    const blankNode = rdf.blankNode();
    const quad = rdf.quad(blankNode, "http://example.org/prop", rdf.literal("test"));
    const quad2 = rdf.quad(blankNode, "http://example.org/prop2", rdf.literal("test2"))
    dataset.add(quad);
    dataset.add(quad2);
    console.log(dataset);
});*/