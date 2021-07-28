import { SetCardModel } from "./SetCardModel";

export class AppModel {
    cardsOnTheTable: SetCardModel[];
    allCardsInDeck: SetCardModel[];

    constructor() {
        this.allCardsInDeck =[];

        ["square","triangle","circle"].forEach(shape => {
            ["blue","green","red"].forEach(color => {
                [1,2,3].forEach(count => {
                    ["stripes","solid","clear"].forEach(pattern => {
                        this.allCardsInDeck.push(new SetCardModel(shape, color, count, pattern));                              
                    })
            
                })
            
            })
            
        })
        for (let i = this.allCardsInDeck.length - 1; i > 0; i--) {
            //Math.floor(Math.random() * (max - min + 1)) + min - min and max both included
            let j = Math.floor(Math.random() * (this.allCardsInDeck.length));
            let temp = this.allCardsInDeck[i];
            this.allCardsInDeck[i] = this.allCardsInDeck[j];
            this.allCardsInDeck[j] = temp;

        }
        

        this.cardsOnTheTable = this.allCardsInDeck.slice(0,12);
    }
}