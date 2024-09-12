import { DatasetCore, Quad, Quad_Graph, Quad_Object, Quad_Predicate, Quad_Subject, Term } from "@rdfjs/types";
import { Dataset, QuadConstructor, Statement, Thing } from "@semantizer/types";

export class StatementImpl implements Statement {
    // private quad: Quad;
    subject: Quad_Subject;
    predicate: Quad_Predicate;
    object: Quad_Object;
    graph: Quad_Graph;
    termType: "Quad";
    value: "";

    public constructor(quad: Quad) {
        // this.quad = quad;
        this.subject = quad.subject;
        this.predicate = quad.predicate;
        this.object = quad.object;
        this.graph = quad.graph;
        this.termType = quad.termType;
        this.value = quad.value;
    }

    public getTermType(): string {
        return this.termType;
    }
    getValue(): string {
        throw new Error("Method not implemented.");
    }
    getSubject(): Term {
        throw new Error("Method not implemented.");
    }
    getPredicate(): Term {
        throw new Error("Method not implemented.");
    }
    getObject(): Term {
        throw new Error("Method not implemented.");
    }
    getGraph(): Term {
        throw new Error("Method not implemented.");
    }
    getDataset(): Dataset {
        throw new Error("Method not implemented.");
    }
    getDocument(): Document {
        throw new Error("Method not implemented.");
    }
    getThing(): Thing {
        throw new Error("Method not implemented.");
    }
    equals(other: Term | null | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    
}

export function StatementMixin<
    TBase extends QuadConstructor
>(Base: TBase) {

    return class StatementMixinImpl extends Base implements Statement {

        public getTermType(): string {
            return this.termType;
        }

        public getValue(): string {
            return this.value;
        }

        public getSubject(): Term {
            return this.subject;
        }

        public getPredicate(): Term {
            return this.predicate;
        }

        public getObject(): Term {
            return this.object;
        }

        public getGraph(): Term {
            return this.graph;
        }

        public getDataset(): Dataset {
            throw new Error("Method not implemented.");
        }

        public getDocument(): Document {
            throw new Error("Method not implemented.");
        }

        public getThing(): Thing {
            throw new Error("Method not implemented.");
        }
    }

}