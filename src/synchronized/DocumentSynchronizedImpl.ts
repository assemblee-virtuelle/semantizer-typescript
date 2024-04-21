import { Changelog, WithChangelog } from "../changelog/Changelog.js";
import DocumentDecoratedImpl from "../core/Decorated.js";
import { DocumentWritable, Statement } from "../core/Document.js";
import { DistantDocument, LocalDocument } from "./DocumentSynchronized.js";

export class DocumentLocalImpl<
    ContainedStatement extends Statement = Statement,
    SelfDescribingStatement extends Statement = Statement
> extends DocumentDecoratedImpl<ContainedStatement, SelfDescribingStatement> 
implements LocalDocument, WithChangelog {

    private _documentWithChangelog: DocumentWritable<ContainedStatement, SelfDescribingStatement> & WithChangelog;

    public constructor(documentWithChangelog: DocumentWritable<ContainedStatement, SelfDescribingStatement> & WithChangelog) {
        super(documentWithChangelog);
        this._documentWithChangelog = documentWithChangelog;
    }

    getChangelog(): Changelog<Statement> {
        return this._documentWithChangelog.getChangelog();
    }
    
    async saveUpdate(): Promise<void> {
        this._documentWithChangelog.getChangelog().getAdded();
        console.log("saveUpdate in DocumentLocalImpl")
    }
    async saveNew(uri: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async saveOverwrite(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    public isLocal(): boolean {
        return true;
    }

    public isDistant(): boolean {
        return false;
    }

    public getDistantUri(): string | undefined {
        return undefined;
    }

    public getDistantUriAll(): string[] {
        return [];
    }

}

export class DocumentDistantImpl<
    ContainedStatement extends Statement = Statement,
    SelfDescribingStatement extends Statement = Statement
> extends DocumentDecoratedImpl<ContainedStatement, SelfDescribingStatement> 
implements DistantDocument {
      
    public isLocal(): boolean {
        return false;
    }

    public isDistant(): boolean {
        return true;
    }

    public toLocalCopy(): LocalDocument {
        throw new Error("Method not implemented.");
    }

    public getDistantUri(): string | undefined {
        return undefined;
    }

    public getDistantUriAll(): string[] {
        return [];
    }

    public save(): void {
        
    }

}

export type DocumentLocalConstructor<
    ContainedStatement extends Statement = Statement,
    SelfDescribingStatement extends Statement = Statement
> = new (documentWithChangelog: DocumentWritable<ContainedStatement, SelfDescribingStatement> & WithChangelog) => DocumentWritable<ContainedStatement, SelfDescribingStatement>;

export function DocumentLocalMixin<TBase extends DocumentLocalConstructor<any, any>>(Base: TBase) {
    return DocumentLocalImpl
    
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