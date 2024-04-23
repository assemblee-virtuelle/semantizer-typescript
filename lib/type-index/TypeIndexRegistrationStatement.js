export function TypeIndexRegistrationStatementMixin(Base) {
    return class TypeIndexRegistrationStatementImpl extends Base {
        isForClass(forClass) {
            throw new Error("Method not implemented");
        }
        isForInstance(instance) {
            throw new Error("Method not implemented");
        }
        isForInstanceContainer(instanceContainer) {
            throw new Error("Method not implemented");
        }
    };
}
//# sourceMappingURL=TypeIndexRegistrationStatement.js.map