export class Player {
    id: number | undefined;
    name: string = '';




    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.cardNumber) this.name = initializer.name;  
      }
}