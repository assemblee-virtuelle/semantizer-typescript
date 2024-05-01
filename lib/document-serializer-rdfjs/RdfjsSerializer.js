var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'readable-stream';
import rdf from 'rdf-ext';
export class RdfjsJsonLdSerializer {
    makeQuadsFromThing(thing) {
        const quads = [];
        for (const statement of thing) {
            quads.push(this.makeQuadFromStatement(statement));
        }
        return quads;
    }
    makeQuadFromStatement(statement) {
        return rdf.quad(rdf.namedNode(statement.getSubject()), rdf.namedNode(statement.getProperty()), rdf.namedNode(statement.getValue()));
    }
    serialize(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = { "solid": "http://www.w3.org/ns/solid/terms#" };
            const serializer = new SerializerJsonld({ compact: true, context: context });
            const input = new Readable({
                objectMode: true,
                read: () => {
                    const selfDescribingThing = document.getThingAboutSelf();
                    if (selfDescribingThing) {
                        this.makeQuadsFromThing(selfDescribingThing).forEach(quad => input.push(quad));
                    }
                    for (const thing of document) {
                        this.makeQuadsFromThing(thing).forEach(quad => input.push(quad));
                    }
                    input.push(null);
                }
            });
            let result = "";
            const output = serializer.import(input);
            output.on("data", (json) => result = JSON.stringify(json));
            const promise = new Promise((resolve, reject) => {
                output.on('end', () => resolve(result));
                output.on('error', (err) => reject(err));
            });
            return promise;
        });
    }
}
//# sourceMappingURL=RdfjsSerializer.js.map