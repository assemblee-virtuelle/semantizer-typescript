import { QueryEngine } from "@comunica/query-sparql";
import { FinalIndexResult, Index, IndexShape, IndexShapeProperty, IndexStrategyBaseImpl, IndexStrategyFinalIndexesDefaultImpl } from "@semantizer/mixin-index";
import { BlankNode, DatasetSemantizer, Literal, NamedNode } from "@semantizer/types";

export class IndexStrategySparqlComunica extends IndexStrategyBaseImpl {

    public async execute(rootIndex: Index, shape: IndexShape, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void> {
        const limitCount: number = limit? limit: 30;
        const finalIndexesStrategy = new IndexStrategyFinalIndexesDefaultImpl();
        const finalIndexStream = finalIndexesStrategy.execute(rootIndex, shape, limit);
        const finalIndexes: string[] = [];

        finalIndexStream.on('data', (result: FinalIndexResult) => finalIndexes.push(result.getIndex().getOrigin()?.value!));

        const propertyPredicateToSparql = (property: IndexShapeProperty): string => {
            return property.isPatternProperty() ? "sh:pattern" : "sh:hasValue";
        }

        const valueToSparql = (value: NamedNode | BlankNode | Literal): string => {
            if (value.termType === 'NamedNode')
                return `<${value.value}>`;
            if (value.termType === "Literal")
                return `"${value.value}"`;
            throw new Error("Unrecognized value");
        }

        return new Promise((resolve, reject) => {
            finalIndexStream.on('end', async () => {
                if (finalIndexes.length > 0) {
                    const comunicaEngine = new QueryEngine();
                    let query = `PREFIX idx: <https://ns.inria.fr/idx/terms#>
                        PREFIX sh: <https://www.w3.org/ns/shacl#>
                        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                        PREFIX sib: <http://cdn.startinblox.com/owl/ttl/vocab.ttl#>
                        
                        SELECT DISTINCT ?result WHERE {`;
                    shape.getFilterProperties().forEach((property, index) => query += `?prop${index} a idx:IndexEntry;
                        idx:hasShape [
                            sh:property [
                                sh:path <${property.getPath()?.value}>;
                                ${propertyPredicateToSparql(property)} ${valueToSparql(property.getValue()!)}
                            ]
                        ];
                        idx:hasTarget ?result.
                    `);
                    query += `} LIMIT ${limitCount}`;

                    // @ts-ignore
                    const bindingsStream = await comunicaEngine.queryBindings(query, { sources: finalIndexes, unionDefaultGraph: true });

                    bindingsStream.on('data', (binding) => {
                        const namedNode = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode;
                        const dataset = this.getSemantizer().build();
                        dataset.setOrigin(namedNode(binding.get('result').value));
                        callbackfn(dataset)
                    });
                    bindingsStream.on('end', () => resolve());
                    bindingsStream.on('error', (error) => reject(error));
                }
                else reject("No final index found.");
            });

            finalIndexStream.on('error', (error) => reject(error));
        });
    }

}
