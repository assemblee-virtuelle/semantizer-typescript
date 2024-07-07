import { Loader } from "./Common";

export interface Semantizer {
    getDefaultLoader(): Loader;
}