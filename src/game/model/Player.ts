import { Card } from "./Card";

export class Player {
    id: number = -1;
    name: string = '';
    isDealer: boolean = false;


    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.name) this.name = initializer.name;  
        if (initializer.isDealer) this.isDealer = initializer.isDealer;  
      }
}