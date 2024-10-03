import { QueryEngine } from "@comunica/query-sparql";
import { FinalIndexResult, Index, IndexShape, IndexShapeProperty, IndexStrategyBaseShapeImpl, IndexStrategyFinalIndexesDefaultImpl } from "@semantizer/mixin-index";
import { BlankNode, DatasetSemantizer, Literal, NamedNode } from "@semantizer/types";

export class IndexStrategySparqlComunica extends IndexStrategyBaseShapeImpl {

    private _sparqlQuery: string;

    /**
     * Here a shape param is expected to be able to find the final indexes. It could be removed when 
     * we will be able to query named graphs with Comunica. If we use the link traversal without the 
     * named graphs querying ability, the request will be very uneffiscient since all the indexes 
     * would be queried (because Comunica use all the sources it discovers). 
     * @param sparqlQuery 
     * @param shape Needed to find the final indexes to query.
     */
    public constructor(sparqlQuery: string, shape: IndexShape) {
        super(shape);
        this._sparqlQuery = sparqlQuery;
    }

    public getSparqlQuery(): string {
        return this._sparqlQuery;
    }

    public async execute(rootIndex: Index, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void> {
        const limitCount: number = limit? limit: 30;
        const finalIndexesStrategy = new IndexStrategyFinalIndexesDefaultImpl();
        const finalIndexStream = finalIndexesStrategy.execute(rootIndex, this.getShape(), limit);
        const finalIndexes: string[] = [];

        finalIndexStream.on('data', (result: FinalIndexResult) => finalIndexes.push(result.getIndex().getOrigin()?.value!));

        return new Promise((resolve, reject) => {
            finalIndexStream.on('end', async () => {
                if (finalIndexes.length > 0) {
                    const comunicaEngine = new QueryEngine();

                    // @ts-ignore
                    const bindingsStream = await comunicaEngine.queryBindings(this.getSparqlQuery(), { sources: finalIndexes, unionDefaultGraph: true });

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
