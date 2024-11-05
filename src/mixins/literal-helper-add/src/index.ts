import { DatasetSemantizerMixinConstructor, NamedNode } from "@semantizer/types";

export interface WithLiteralHelperAdd {
    addBoolean(subject: NamedNode, predicate: NamedNode, value: string, graph?: NamedNode): void;
    addDate(predicate: NamedNode, value: Date, graph?: NamedNode): void;
    addDatetime(predicate: NamedNode, value: Date, graph?: NamedNode): void;
    addDecimal(subject: NamedNode, predicate: NamedNode, value: number, graph?: NamedNode): void;
    addInteger(subject: NamedNode, predicate: NamedNode, value: number, graph?: NamedNode): void;
    addStringEnglish(predicate: NamedNode, value: string, graph?: NamedNode): void;
    addStringNoLocale(subject: NamedNode, predicate: NamedNode, value: string, graph?: NamedNode): void;
    addStringWithLocale(predicate: NamedNode, value: string, locale: string, graph?: NamedNode): void;
    addTime(predicate: NamedNode, value: Date, graph?: NamedNode): void;
}

export function LiteralHelperAddMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class LiteralHelperAddMixinImpl extends Base implements WithLiteralHelperAdd {
        
        public addBoolean(subject: NamedNode, predicate: NamedNode, value: string, graph?: NamedNode): void {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const literal = dataFactory.literal(value.toString(), dataFactory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'));
            this.add(dataFactory.quad(subject, predicate, literal, graph));
        }
        
        public addDate(predicate: NamedNode, value: Date, graph?: NamedNode): void {
            throw new Error("Method not implemented.");
        }
        
        public addDatetime(predicate: NamedNode, value: Date, graph?: NamedNode): void {
            throw new Error("Method not implemented.");
        }
        
        public addDecimal(subject: NamedNode, predicate: NamedNode, value: number, graph?: NamedNode): void {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const literal = dataFactory.literal(value.toString(), dataFactory.namedNode('http://www.w3.org/2001/XMLSchema#decimal'));
            this.add(dataFactory.quad(subject, predicate, literal, graph));
        }
        
        public addInteger(subject: NamedNode, predicate: NamedNode, value: number, graph?: NamedNode): void {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const literal = dataFactory.literal(value.toString(), dataFactory.namedNode('http://www.w3.org/2001/XMLSchema#integer'));
            this.add(dataFactory.quad(subject, predicate, literal, graph));
        }
        
        public addStringEnglish(predicate: NamedNode, value: string, graph?: NamedNode): void {
            throw new Error("Method not implemented.");
        }
        
        public addStringNoLocale(subject: NamedNode, predicate: NamedNode, value: string, graph?: NamedNode): void {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const literal = dataFactory.literal(value);
            this.add(dataFactory.quad(subject, predicate, literal, graph));
        }

        public addStringWithLocale(predicate: NamedNode, value: string, locale: string, graph?: NamedNode): void {
            throw new Error("Method not implemented.");
        }
        
        public addTime(predicate: NamedNode, value: Date, graph?: NamedNode): void {
            throw new Error("Method not implemented.");
        }

    }

}