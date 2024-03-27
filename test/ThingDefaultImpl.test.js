import expect from 'node:assert';
import { test } from 'node:test';
import rdf from 'rdf-ext';
import SemantizerDefault from "../lib/SemantizerDefaultImple.js";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'readable-stream';

const semantizer = new SemantizerDefault();

const uris = [
    "ex:predicate",
    "ex:aA-_%&$!?=",
    "ex:-predicate",
    "ex:-aA_%&$!?=",
    "ex:predicate-",
    "ex:-predicate-",
    "ex:_predicate",
    "ex:123456",
    "http://example.org",
    "http://example.org/",
    "http://example.org/?",
    "http://example.org/?=",
    "http://example.org/?=",
    "http://example.org/example",
    "http://example.org/example.ext",
    "http://example.org/123456",
    "http://example.org/123456.ext",
    "http://example.org/example-example",
    "http://example.org/example#fragment",
    "https://example.org/example",
    "https://example.org/example#fragment",
];

// getDocumentFromSelfDescribingThing
test("ThingDefaultImpl:0000", () => {
    const document = semantizer.createDocument();
    const thing = document.createThingToSelfDescribe();
    expect.strictEqual(thing.getDocument(), document);
});

// getDocumentFromThing
test("ThingDefaultImpl:0001", () => {
    const document = semantizer.createDocument();
    const thing = document.createThing();
    expect.strictEqual(thing.getDocument(), document);
});

// getDocumentFromThingWithoutUri
test("ThingDefaultImpl:0002", () => {
    const document = semantizer.createDocument();
    const thing = document.createThingWithoutUri();
    expect.strictEqual(thing.getDocument(), document);
});

test("ThingDefaultImpl:filter", () => {

});

test("ThingDefaultImpl:isAnonymous1", () => {
    const document = semantizer.createDocument();
    const thing = document.createThingToSelfDescribe();
    expect.strictEqual(thing.isAnonymous(), false);
});

test("ThingDefaultImpl:isAnonymous2", () => {
    const document = semantizer.createDocument();
    const thing = document.createThing();
    expect.strictEqual(thing.isAnonymous(), false);
});

test("ThingDefaultImpl:isAnonymous3", () => {
    const document = semantizer.createDocument();
    const thing = document.createThingWithoutUri();
    expect.strictEqual(thing.isAnonymous(), true);
});

test("ThingDefaultImpl:getContext", () => {

});

test("ThingDefaultImpl:expand", () => {

});

test("ThingDefaultImpl:shorten", () => {

});

test("ThingDefaultImpl:equals", () => {

});

test("ThingDefaultImpl:toRdfDatasetExt", () => {

});


test("ThingDefaultImpl:addStatement", () => {

});

test("ThingDefaultImpl:addStatementFrom", () => {

});

test("ThingDefaultImpl:addRdfTypeStatement:0001", () => {
    const document = semantizer.createDocument();
    const thing = document.createThingToSelfDescribe();
    expect.strictEqual(thing.getRdfTypeValue(), null);
    expect.strictEqual(thing.getAllRdfTypeValues(), []);
});

test("ThingDefaultImpl:addRdfTypeStatement:0002", () => {
    const document = semantizer.createDocument();
    const thing = document.createThing();
    expect.strictEqual(thing.getRdfTypeValue(), null);
    expect.strictEqual(thing.getAllRdfTypeValues(), []);
});

test("ThingDefaultImpl:addRdfTypeStatement:0003", () => {
    const document = semantizer.createDocument();
    const thing = document.createThingWithoutUri();
    expect.strictEqual(thing.getRdfTypeValue(), null);
    expect.strictEqual(thing.getAllRdfTypeValues(), []);
});

test("ThingDefaultImpl:addRdfTypeStatement:0004", () => {
    const document = semantizer.createDocument();
    const thing = document.createThingToSelfDescribe();
    thing.addRdfTypeStatement("ex:type");
    expect.strictEqual(thing.getRdfTypeValue(), "ex:type");
});

test("ThingDefaultImpl:addRdfTypeStatement:0005", () => {
    const document = semantizer.createDocument();
    const thing = document.createThingToSelfDescribe();
    thing.addRdfTypeStatement("http://example.org/type");
    expect.strictEqual(thing.getRdfTypeValue(), "http://example.org/type");
});

test("ThingDefaultImpl:addRdfTypeStatement:0006", () => {
    const document = semantizer.createDocument();
    const thing = document.createThing();
    thing.addRdfTypeStatement("http://example.org/type");
    expect.strictEqual(thing.getRdfTypeValue(), "http://example.org/type");
});

test("ThingDefaultImpl:addRdfTypeStatement:0007", () => {
    const document = semantizer.createDocument();
    const thing = document.createThingWithoutUri();
    thing.addRdfTypeStatement("http://example.org/type");
    expect.strictEqual(thing.getRdfTypeValue(), "http://example.org/type");
});

test("ThingDefaultImpl:addBooleanStatement", () => {

});

test("ThingDefaultImpl:addStringStatement", () => {

});

test("ThingDefaultImpl:addDecimalStatement", () => {

});

test("ThingDefaultImpl:addIntegerStatement", () => {

});

test("ThingDefaultImpl:addDateStatement", () => {

});

test("ThingDefaultImpl:addDatetimeStatement", () => {

});

test("ThingDefaultImpl:addTimeStatement", () => {

});


test("ThingDefaultImpl:getRdfTypeValue", () => {

});

test("ThingDefaultImpl:getAllRdfTypeValues", () => {

});

test("ThingDefaultImpl:getBooleanStatementValue", () => {

});

test("ThingDefaultImpl:getAllBooleanStatementValues", () => {

});

test("ThingDefaultImpl:getStringStatementValue", () => {

});

test("ThingDefaultImpl:getAllStringStatementValues", () => {

});

test("ThingDefaultImpl:getDecimalStatementValue", () => {

});

test("ThingDefaultImpl:getAllDecimalStatementValues", () => {

});

test("ThingDefaultImpl:getIntegerStatementValue", () => {

});

test("ThingDefaultImpl:getAllIntegerStatementValues", () => {

});

test("ThingDefaultImpl:getDateStatementValue", () => {

});

test("ThingDefaultImpl:getAllDateStatementValues", () => {

});

test("ThingDefaultImpl:getDatetimeStatementValue", () => {

});

test("ThingDefaultImpl:getAllDatetimeStatementValues", () => {

});

test("ThingDefaultImpl:getTimeStatementValue", () => {

});

test("ThingDefaultImpl:getAllTimeStatementValues", () => {

});


test("ThingDefaultImpl:setRdfTypeStatement", () => {

});

test("ThingDefaultImpl:setBooleanStatement", () => {

});

test("ThingDefaultImpl:setStringStatement", () => {

});

test("ThingDefaultImpl:setDecimalStatement", () => {

});

test("ThingDefaultImpl:setIntegerStatement", () => {

});

test("ThingDefaultImpl:setDateStatement", () => {

});

test("ThingDefaultImpl:setDatetimeStatement", () => {

});

test("ThingDefaultImpl:setTimeStatement", () => {

});


test("ThingDefaultImpl:removeAllStatements", () => {

});

test("ThingDefaultImpl:removeRdfTypeStatement", () => {

});

test("ThingDefaultImpl:removeBooleanStatement", () => {

});

test("ThingDefaultImpl:removeStringStatement", () => {

});

test("ThingDefaultImpl:removeDecimalStatement", () => {

});

test("ThingDefaultImpl:removeIntegerStatement", () => {

});

test("ThingDefaultImpl:removeDateStatement", () => {

});

test("ThingDefaultImpl:removeDatetimeStatement", () => {

});

test("ThingDefaultImpl:removeTimeStatement", () => {

});
