export {};
//  & 
//     WithFactory<Document<ContainedThing, SelfDescribingThing>> & // Should be this
//     WithReadOperations<Document<ContainedThing, SelfDescribingThing>> &
//     WithWriteOperations<Document<ContainedThing, SelfDescribingThing>> &
//     WithCreateOperations<Document<ContainedThing, SelfDescribingThing>> &
//     WithCopyOperations & 
//     WithCopyWritableOperations;
/*export type TypeIndexReadonly<
    ContainedThing extends ThingReadonly<any> = ThingReadonly<any>,
    SelfDescribingThing extends ThingReadonly<any> = ThingReadonly<any>
> = DocumentReadonly<ContainedThing, SelfDescribingThing> &
    WithReadOperations<ContainedThing>;*/
/*
= DocumentReadonly<TypeIndexRegistrationReadonly, ThingReadonly> &
    WithReadOperations<TypeIndexRegistrationReadonly<StatementReadonly>>;
    */ 
//# sourceMappingURL=TypeIndex.js.map