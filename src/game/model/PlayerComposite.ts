import { Card } from "./Card";
import { Player } from "./Player";

export class PlayerComposite {
    player: Player = new Player();
    cards: Card[] = [];


    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.player) this.player = initializer.player;
        if (initializer.cards) this.cards = initializer.cards;

      }
}