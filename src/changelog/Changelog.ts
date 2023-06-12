import AddCommand from "../property/command/AddCommand";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface";
import SemanticableCommand from "../object/SemanticableCommand";

export default class Changelog {

    private _properties: Map<string, Array<number>>; // p1 [0,1,3]
    private _changes: Array<SemanticableCommand<SemanticPropertyInterface<any>>>;

/*    0: AddCommand P1
    1: SetCommand P2
    2: AddCommand P1

    add P1 v1 -> [ (add P1 v2) ]
    set P1 v2 -> [ (add P1 v2) ]
    add P2 v2 -> [ (add P1 v2) (add P2 v2) ]
    set P1 v3 -> [ (add P1 v3) (add P2 v2) ]

    ====>

    add P1 v3

    Peut être intérrésant de rejouer le changelog sur des dataset différents ou chargés après.

*/

    constructor() {
        this._properties = new Map();
        this._changes = new Array();
    }

    register(change: SemanticableCommand<SemanticPropertyInterface<any>>) {
        if (change instanceof AddCommand) {
            // s'il existe un add ou un set avec la même valeur on ne fait rien
            
            // sinon on l'enregistre
        }

        //else if (change instanceof SetCommand) {
            // s'il existe déjà un set avec la même valeur, on ne fait rien
            // s'il existe déjà un add pour la même propriété mais de valeur différente, on le remplace avec la nouvelle valeur
            // sinon on l'ajoute en tant que set
        //}
    }

}