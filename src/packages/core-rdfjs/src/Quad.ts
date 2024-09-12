import dataFactory from '@rdfjs/data-model';
import { Quad, Quad_Graph, Quad_Object, Quad_Predicate, Quad_Subject, Term } from "@rdfjs/types";

export class QuadImpl implements Quad {
    private _quad: Quad;
    public subject: Quad_Subject;
    public predicate: Quad_Predicate;
    public object: Quad_Object;
    public graph: Quad_Graph;
    public termType: "Quad";
    public value: "";

    public constructor(subject: Quad_Subject, predicate: Quad_Predicate, object: Quad_Object, graph?: Quad_Graph) {
        this._quad = dataFactory.quad(subject, predicate, object, graph);
        this.subject = this._quad.subject;
        this.predicate = this._quad.predicate;
        this.object = this._quad.object;
        this.graph = this._quad.graph;
        this.termType = this._quad.termType;
        this.value = this._quad.value;
    }
    
    public equals(other: Term | null | undefined): boolean {
        return this._quad.equals(other);
    }
}

export default QuadImpl;