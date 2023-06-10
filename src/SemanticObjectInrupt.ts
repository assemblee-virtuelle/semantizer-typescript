import { SolidDataset, Thing, addStringNoLocale, buildThing, createSolidDataset, createThing, fromRdfJsDataset, getSourceUrl, getThing, saveSolidDatasetAt, setBoolean, setThing } from "@inrupt/solid-client";
import SemanticObject from "./object/SemanticObject.js";
import Changelogable from "./changelog/Changelogable.js";
import { rdfJsDataset } from "@inrupt/solid-client/dist/rdf.internal.js";
import StoreInterface from "./store/StoreInterface.js";
import SemanticableCommand from "./object/SemanticableCommand.js";
import SemanticPropertyInterface from "./property/SemanticPropertyInterface.js";
import AddCommand from "./property/command/AddCommand.js";

export default class SemanticObjectInrupt extends SemanticObject {

    private _thing: Thing | undefined;

    constructor(parameters: { store: StoreInterface, other?: Thing }) {
        super({ store: parameters.store });

        if (parameters.other)
            this._thing = parameters.other;
    }

    public static fromRdfjsDataset(rdfjsDataset: DatasetCore<Quad, Quad>): SemanticObjectInrupt {
        return new SemanticObjectInrupt(fromRdfJsDataset(rdfJsDataset));
    }
    
    protected apply(thing: Thing, changelog: Changelogable<string, SemanticableCommand<SemanticPropertyInterface<any>>>): Thing {
        for (const change of changelog.getChanges()) {
            if (change instanceof AddCommand) {
                const property: SemanticPropertyInterface<any> = change.getTarget();
                
                if (typeof(property.getValue()) === "string") {
                    thing = addStringNoLocale(thing, property.getName(), property.getValue());
                }
            }
        }

        return thing;
    }

    protected async saveTemplateMethod(url?: string, methodHint?: "PUT" | "POST" | "PATCH"): Promise<string> {
        let solidDatasetUrl: string, thing: Thing;
        let solidDataset: SolidDataset = createSolidDataset(); // this.getStore().get(ur); this._dataset;
        
        // If there is an Url passed, we want to save a new resource on the POD.
        if (url) {
            solidDatasetUrl = url;
            thing = buildThing(createThing()).build();
        }

        // If there is no url passed, it must be an existing distant dataset.
        // So we apply the changes on it and we override it on the POD.
        else {
            solidDatasetUrl = getSourceUrl(this._dataset!)!;
            thing = getThing(this._dataset!, "")!;
        }
        
        // We replay the changelog on the thing
        thing = this.apply(thing, this.getChangelog());

        solidDataset = setThing(solidDataset, thing);

        if (solidDatasetUrl) {
            const response = await saveSolidDatasetAt(solidDatasetUrl, solidDataset);
            
            // If the dataset was successfuly saved, we save it in the object.
            if (response) {
                this._dataset = solidDataset;
            }
        }

        return solidDatasetUrl;
    }

}