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
    serialize(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializer = new SerializerJsonld({ compact: true }); //, context: context });
            const input = new Readable({
                objectMode: true,
                read: () => {
                    document.forEach((thing) => thing.forEach((statement) => {
                        input.push(rdf.quad(rdf.namedNode(statement.getSubject()), rdf.namedNode(statement.getProperty()), rdf.literal(statement.getValue())));
                    }));
                    input.push(null);
                }
            });
            let result = "";
            const output = serializer.import(input);
            output.on("data", (json) => result = json);
            const promise = new Promise((resolve, reject) => {
                output.on('end', () => resolve(result));
            });
            return promise;
        });
    }
}
//# sourceMappingURL=RdfjsSerializer.js.map