export class Card {
    id: number | undefined;
    cardNumber: number | undefined;
    suit: string = '';
    imageUrl: string = '';


    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.cardNumber) this.cardNumber = initializer.cardNumber;
        if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
        if (initializer.suit) this.suit = initializer.suit;
    
      }
}

