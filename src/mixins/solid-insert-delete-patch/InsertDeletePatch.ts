import { Statement } from "../core/Statement";

export interface InsertDeletePatch {
    getWhere(): Statement[];
    getInserts(): Statement[];
    getDeletes(): Statement[];
    
    addWhere(statement: Statement): void;
}