import SemantizerImpl from "@semantizer/core";
import { DatasetMixin, DatasetImpl } from "@semantizer/core-rdfjs";
import { LoaderRdfjs } from "@semantizer/loader-rdfjs";

const Semantizer = new SemantizerImpl(DatasetMixin(DatasetImpl), new LoaderRdfjs());
export default Semantizer;