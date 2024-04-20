import { ResourceCollection, ResourceCollectionWritable, Copyable, CopyableToReadonly, CopyableToWritable, Resource, WithContext, WithContextWritable, WithOwner } from "../core/Common";
import { Document, DocumentBase, OutputOf } from "../core/Document";
import { Statement, StatementBase } from "./Statement";

type ContainedDocumentOf<T extends Thing<any, any>> = T extends Thing<any, infer TypeArg> ? TypeArg: never;
export type StatementOf<T extends Thing<any, any>> = T extends Thing<infer TypeArg, any> ? TypeArg : never;

export interface ThingBase<ContainedStatement extends StatementBase> extends Resource {}

export interface WithNotifications {
    registerCallbackForStatementAdded(callbackfn: (value: string) => void): ThisType<this>;
    registerCallbackForStatementRemoved(callbackfn: (datatype: string) => void): ThisType<this>;
    registerCallbackForStatementChanged(callbackfn: (language: string) => void): ThisType<this>;
}

export interface WithWriteOperations {
    createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this
    removeStatement(about: string, value: string | Resource, datatype?: string, language?: string): ThisType<this>;
    removeStatementAll(about: string): ThisType<this>;
    // save(): Thing; // save to document
    setStatement(about: string, value: string, oldValue?: string, datatype?: string, language?: string): ThisType<this>;
}

export type Thing<
    ContainedStatement extends Statement<any>, //, any>, 
    DocumentType extends Document<any, any> 
> = Resource & 
    ResourceCollection<ContainedStatement> & 
    WithContext & 
    WithOwner<DocumentType> & 
    // CopyableToWritable<OutputOf<DocumentType>> & 
    Copyable;

export type ThingWritable<
    ContainedStatement extends Statement<any>, //, any>, 
    DocumentType extends Document<any, any> 
    //ThingType extends Thing<any, any>
> = Thing<ContainedStatement, DocumentType> & //Thing<StatementOf<ThingType>, ContainedDocumentOf<ThingType>>  & 
    WithWriteOperations;

// export type ThingWritable<
//     ContainedStatement extends StatementWritable<any, any>, 
//     DocumentType extends DocumentWritable<any, any> 
// > = ThingBase<ContainedStatement> &  
//     //ResourceCollection<ContainedStatement> & 
//     ResourceCollectionWritable<ContainedStatement> & 
//     WithContext & 
//     WithContextWritable & 
//     WithOwner<DocumentType> & 
//     Copyable & 
//     CopyableToReadonly<OutputOf<DocumentType>> & 
//     WithWriteOperations;