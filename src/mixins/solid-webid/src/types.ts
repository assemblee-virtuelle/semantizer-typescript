import { TypeIndex } from "@semantizer/mixin-typeindex";
import { DatasetSemantizer, Loader } from "@semantizer/types";

export interface SolidWebIdProfileOperations {
    getPrimaryTopic(): SolidWebId;
    loadExtendedProfile(loader?: Loader): Promise<void>;
}

export interface SolidWebIdOperations {
    getPublicTypeIndex(): TypeIndex | undefined;
    getSeeAlsoAll(): DatasetSemantizer[]; // SolidWebIdProfile;
    getPreferencesFile(): DatasetSemantizer | undefined;
    getLdpInbox(): DatasetSemantizer | undefined;
    getStorageAll(): DatasetSemantizer[];
}

export type SolidWebIdProfile = DatasetSemantizer & SolidWebIdProfileOperations;
export type SolidWebId = DatasetSemantizer & SolidWebIdOperations;
export type SolidWebIdProfileConstructor = new (...args: any[]) => SolidWebIdProfile;
export type SolidWebIdConstructor = new (...args: any[]) => SolidWebId;