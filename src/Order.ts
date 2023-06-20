//import SemanticObjectInrupt from "../../semantizer-typescript-solid/src/SemanticObjectInrupt";
import SemanticObject from "./core/SemanticObject";
import Semanticable from "./core/Semanticable";
import StoreInterface from "./store/StoreInterface";
import StoreMapSemanticable from "./store/StoreMapSemanticable";

export default class Order /*extends SemanticObjectInrupt*/ {

    constructor(parameters: { store: StoreInterface<string, Semanticable<void, void, void>> }) {
        //super({ store: parameters.store });
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

/*
const store = new StoreMapSemanticable();
const order = new Order({ store: store });
order.addSemanticProperty<string>(RDF.type, DFC.Order);
order.addSemanticProperty<boolean>("isReadOnly", false);
order.save("https://localhost:8000/lecoqlibre/datafoodconsortium/orders/", "POST");

const order2 = store.get<SemanticObject>("");

const initialThing: Thing = SolidThingImporter.import();
const order3 = new Order({ store: store, initialState: initialThing})

Solid document <https://url_1>

<#123> a dfc:Person.

<https://url_2> a dfc:Enterprise. --> Impossible

Solid = Store: url => SolidDataset
DFC = store: url => rdfjs

2 stores:
- id_interne => semanticObject
- url => id_interne


//const dataset = RdfjsImporter.import(data);
//const order4 = Order.fromRdfjsDataset(store, dataset, "https://...");

const order5 = new Order({ store: store }); // stocke un objet local dans le store
order5.synchronize("https://..."); // demande une création. l'identifiant interne devient une URL
order5.synchronize(); // demande une mise à jour car il y a déjà une URL présente
order5.synchronize("https://..."); // regarde dans le store s'il y a, sinon va chercher et store, puis charge dans le changelog ?


const order6 = new  Order({ store: store });
order6.addSemanticProperty("description", "first");
await order6.synchronize("https://order6");
// we do some work and we forget about order6
const order7 = new  Order({ store: store });
order7.addSemanticProperty("description", "blabla");
await order7.synchronize("https://order6"); // the changes will be merged

/*
Synchronize:
RESOURCE    SIGNIFICATION                       CONDITIONS                                              ERREUR
------------------------------------------------------------------------------------------------------------------------------------------
undefined   demande de mise à jour              il doit y avoir qu'une seule resource synchronisée      Throws
                                                ou le paramètres resources doit être présent.
defined     - demande de création: l'objet
            a été stocké avec un identifiant 
            local.
            - demande de mise à jour: l'objet
            a une url dans le store ou il existe
            de manière distante.
*/