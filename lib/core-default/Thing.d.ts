import { ResourceCollection, Copyable, Resource, WithContext, WithOwner } from "../core/Common";
import { Document } from "../core/Document";
import { Statement, StatementBase } from "./Statement";
export type StatementOf<T extends Thing<any, any>> = T extends Thing<infer TypeArg, any> ? TypeArg : never;
export interface ThingBase<ContainedStatement extends StatementBase> extends Resource {
}
export interface WithNotifications {
    registerCallbackForStatementAdded(callbackfn: (value: string) => void): ThisType<this>;
    registerCallbackForStatementRemoved(callbackfn: (datatype: string) => void): ThisType<this>;
    registerCallbackForStatementChanged(callbackfn: (language: string) => void): ThisType<this>;
}
export interface WithWriteOperations {
    createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this;
    removeStatement(about: string, value: string | Resource, datatype?: string, language?: string): ThisType<this>;
    removeStatementAll(about: string): ThisType<this>;
    setStatement(about: string, value: string, oldValue?: string, datatype?: string, language?: string): ThisType<this>;
}
export type Thing<ContainedStatement extends Statement<any>, //, any>, 
DocumentType extends Document<any, any>> = Resource & ResourceCollection<ContainedStatement> & WithContext & WithOwner<DocumentType> & Copyable;
export type ThingWritable<ContainedStatement extends Statement<any>, //, any>, 
DocumentType extends Document<any, any>> = Thing<ContainedStatement, DocumentType> & //Thing<StatementOf<ThingType>, ContainedDocumentOf<ThingType>>  & 
WithWriteOperations;
//# sourceMappingURL=Thing.d.ts.map