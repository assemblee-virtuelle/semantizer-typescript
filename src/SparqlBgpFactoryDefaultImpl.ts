export class SparqlBgpFactoryDefaultImpl {

    public createBgpSparqlQuery(rdfType: string, selectedVariable: string = "uri"): string {
        return `SELECT ?${selectedVariable} WHERE { ?${selectedVariable} a ${rdfType} }`;
    }

}

export default SparqlBgpFactoryDefaultImpl;