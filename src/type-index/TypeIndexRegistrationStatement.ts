import { Statement, StatementConstructor } from "../core/Statement";
import { TypeIndexStatement } from "./TypeIndex";

export function TypeIndexRegistrationStatementMixin<
    TBase extends StatementConstructor<Statement>
>(Base: TBase) {
 
    return class TypeIndexRegistrationStatementImpl extends Base implements TypeIndexStatement {

        public isForClass(forClass: string): boolean {
            throw new Error("Method not implemented");
        }

        public isForInstance(instance: string): boolean {
            throw new Error("Method not implemented");
        }

        public isForInstanceContainer(instanceContainer: string): boolean {
            throw new Error("Method not implemented");
        }

    }

}