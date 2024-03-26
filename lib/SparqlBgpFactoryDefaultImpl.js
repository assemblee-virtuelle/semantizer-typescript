export class SparqlBgpFactoryDefaultImpl {
    createBgpSparqlQuery(rdfType, selectedVariable = "uri") {
        return `SELECT ?${selectedVariable} WHERE { ?${selectedVariable} a ${rdfType} }`;
    }
}
export default SparqlBgpFactoryDefaultImpl;
//# sourceMappingURL=SparqlBgpFactoryDefaultImpl.js.map