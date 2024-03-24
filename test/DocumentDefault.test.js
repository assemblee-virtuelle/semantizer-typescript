import expect from 'node:assert';
import { test } from 'node:test';
import rdf from 'rdf-ext';
import SemantizerDefault from "../lib/SemantizerDefault.js";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'readable-stream';

const semantizer = new SemantizerDefault();

test("DocumentDefault:create", () => {
    let document = semantizer.createDocument();
    expect.strictEqual(document.getSemanticId(), "");
    document.addRdfTypeStatement("ex:Type");
    expect.strictEqual(document.getFirstRdfTypeValue(), "ex:Type");
    document.addRdfTypeStatement("ex:Type2");
    expect.strictEqual(document.getFirstRdfTypeValue(), "ex:Type");

    const semanticTypes = document.getAllRdfTypeValues();
    expect.strictEqual(semanticTypes.length, 2);
    expect.strictEqual(semanticTypes[0], "ex:Type");
    expect.strictEqual(semanticTypes[1], "ex:Type2");

    console.log(document)
});

test("DocumentDefault:create", () => {
    const document = semantizer.createDocument();
    expect.strictEqual(document.getSemanticId(), "");

    const property = "http://example.org/property";
    const value = "value"
    document.addStringStatementAbout(property, value);
    expect.strictEqual(document.getFirstStringValueAboutStatement(property), value);
});

/*
test('DocumentDefault:export', () => {
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