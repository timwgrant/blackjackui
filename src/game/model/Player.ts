import { Card } from "./Card";

export class Player {
    id: number = -1;
    name: string = '';
    isDealer: boolean = false;
    balance: number = 0;



    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.name) this.name = initializer.name;  
        if (initializer.balance) this.name = initializer.balance;  
        if (initializer.isDealer) this.isDealer = initializer.isDealer;  
      }
}