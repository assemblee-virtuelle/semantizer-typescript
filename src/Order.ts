import SemanticObjectInrupt from "./SemanticObjectInrupt";
import StoreInterface from "./store/StoreInterface";
import StoreMap from "./store/StoreMap";

export default class Order extends SemanticObjectInrupt {

    constructor(parameters: { store: StoreInterface }) {
        super({ store: parameters.store });
    }
/*
    public async getOrderedBy(): Promise<Agent> {
        // make a new command
        // pass it to the queue
        // wait for the result
        return await super.getSemanticProperty<Agent>("orderedBy");
    }

    public getTotalPrice(): number {
        // compute the logic here
        return 42;
    }
*/
}

const RDF = { type: "" };
const DFC = { Order: "" };

const store = new StoreMap();
const order = new Order({ store: store });
order.addSemanticProperty<string>(RDF.type, DFC.Order);
order.addSemanticProperty<boolean>("isReadOnly", false);
order.save("https://localhost:8000/lecoqlibre/datafoodconsortium/orders/", "POST");