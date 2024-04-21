var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DocumentDecoratedImpl from "../core/Decorated.js";
export class DocumentLocalImpl extends DocumentDecoratedImpl {
    constructor(documentWithChangelog) {
        super(documentWithChangelog);
        this._documentWithChangelog = documentWithChangelog;
    }
    getChangelog() {
        return this._documentWithChangelog.getChangelog();
    }
    saveUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            this._documentWithChangelog.getChangelog().getAdded();
            console.log("saveUpdate in DocumentLocalImpl");
        });
    }
    saveNew(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    saveOverwrite() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    isLocal() {
        return true;
    }
    isDistant() {
        return false;
    }
    getDistantUri() {
        return undefined;
    }
    getDistantUriAll() {
        return [];
    }
}
export class DocumentDistantImpl extends DocumentDecoratedImpl {
    isLocal() {
        return false;
    }
    isDistant() {
        return true;
    }
    toLocalCopy() {
        throw new Error("Method not implemented.");
    }
    getDistantUri() {
        return undefined;
    }
    getDistantUriAll() {
        return [];
    }
    save() {
    }
}
export function DocumentLocalMixin(Base) {
    return DocumentLocalImpl;
    // class Test extends Base implements LocalDocument, WithChangelog {
    //     // private _documentWithChangelog: DocumentWritable<ContainedStatement, SelfDescribingStatement> & WithChangelog;
    //     // public constructor(documentWithChangelog: DocumentWritable<ContainedStatement, SelfDescribingStatement> & WithChangelog) {
    //     //     super(documentWithChangelog);
    //     //     this._documentWithChangelog = documentWithChangelog;
    //     // }
    //     public constructor(...args: any[]) {
    //         super(args);
    //     }
    //     getChangelog(): Changelog<Statement> {
    //         return this._documentWithChangelog.getChangelog();
    //     }
    //     saveUpdate(): void {
    //         this._documentWithChangelog.getChangelog().getAdded();
    //         console.log("saveUpdate in DocumentLocalImpl")
    //     }
    //     saveNew(uri: string): void {
    //         throw new Error("Method not implemented.");
    //     }
    //     saveOverwrite(): void {
    //         throw new Error("Method not implemented.");
    //     }
    //     public isLocal(): boolean {
    //         return true;
    //     }
    //     public isDistant(): boolean {
    //         return false;
    //     }
    //     public getDistantUri(): string | undefined {
    //         return undefined;
    //     }
    //     public getDistantUriAll(): string[] {
    //         return [];
    //     };
    // }
}
//# sourceMappingURL=DocumentSynchronizedImpl.js.map