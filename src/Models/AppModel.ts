import { makeObservable, observable } from "mobx";
import { SetCardModel } from "./SetCardModel";

export class AppModel {
    @observable cardsOnTheTable: SetCardModel[];
    @observable setMessage?: string;
    allCardsInDeck: SetCardModel[];
    numberOfSets: number;

    constructor() {
        makeObservable(this);
        this.numberOfSets = 0;
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

        setInterval(()=>{this.numberOfSets++}, 1000)

        /*
        for (let i = this.allCardsInDeck.length - 1; i > 0; i--) {
            //Math.floor(Math.random() * (max - min + 1)) + min - min and max both included
            let j = Math.floor(Math.random() * (this.allCardsInDeck.length));
            let temp = this.allCardsInDeck[i];
            this.allCardsInDeck[i] = this.allCardsInDeck[j];
            this.allCardsInDeck[j] = temp;

        }
        */
        
        this.cardsOnTheTable = this.allCardsInDeck.slice(0,12);
        this.allCardsInDeck = this.allCardsInDeck.slice(12);

    }

    isASet(cards: SetCardModel[]) {
        var sameShape = false;
        var diffShape = false;
        var sameColor = false;
        var diffColor = false;
        var sameCount = false;
        var diffCount = false;
        var samePattern = false;
        var diffPattern = false;
        let isASet = false;

        if(cards.length !== 3) return false;

        if (cards[0].shape === cards[1].shape && cards[1].shape === cards[2].shape) {
            sameShape = true;
        } else if (cards[0].shape !== cards[1].shape && cards[1].shape !== cards[2].shape && cards[0].shape !== cards[2].shape) {
            diffShape = true;
        }

        if (cards[0].color === cards[1].color && cards[1].color === cards[2].color) {
            sameColor = true;
        } else if (cards[0].color !== cards[1].color && cards[1].color !== cards[2].color && cards[0].color !== cards[2].color) {
            diffColor = true;
        }
        
        if (cards[0].count === cards[1].count && cards[1].count === cards[2].count) {
            sameCount = true;
        } else if (cards[0].count !== cards[1].count && cards[1].count !== cards[2].count && cards[0].count !== cards[2].count) {
            diffCount = true;
        }
        
        if (cards[0].pattern === cards[1].pattern && cards[1].pattern === cards[2].pattern) {
            samePattern = true;
        } else if (cards[0].pattern !== cards[1].pattern && cards[1].pattern !== cards[2].pattern && cards[0].pattern !== cards[2].pattern) {
            diffPattern = true;
        }   
        
        // all different
        if (diffShape && diffColor && diffCount && diffPattern) {
            isASet = true;
        }           

        // three same, one differet
        if ((diffShape && sameColor && sameCount && samePattern) || 
            (sameShape && diffColor && sameCount && samePattern) ||
            (sameShape && sameColor && diffCount && samePattern) ||
            (sameShape && sameColor && sameCount && diffPattern)) {
            isASet = true;
        }
                
        // two same, two different
        if ((diffShape && diffColor && sameCount && samePattern) ||
            (diffShape && sameColor && diffCount && samePattern) ||
            (diffShape && sameColor && sameCount && diffPattern) ||
            (sameShape && diffColor && diffCount && samePattern) ||
            (sameShape && diffColor && sameCount && diffPattern) ||
            (sameShape && sameColor && diffCount && diffPattern)) {
            isASet = true;
        }             
        
        // three diff, one same
        if ((sameShape && diffColor && diffCount && diffPattern) ||
            (diffShape && sameColor && diffCount && diffPattern) ||
            (diffShape && diffColor && sameCount && diffPattern) ||
            (diffShape && diffColor && diffCount && samePattern)) {
            isASet = true;
        }  
        
        return isASet;
    }


    isASet2(cards: SetCardModel[]) {
        let matchCondition = 0;
        let conditionBit = 1;
        const qualities = ["shape", "color", "pattern", "count"]

        qualities.forEach(property => {
            const values = cards.map(c => (c as any)[property])
            const isSet =
                (values[0] === values[1] && values[1] === values[2]) // all same
                || (values[0] !== values[1] && values[1] !== values[2] && values[0] !== values[2])

            if(isSet) {
                matchCondition += conditionBit;
            }

            conditionBit <<= 1; 
        })

        return matchCondition === 0xF;
    }

    checkForSet() {
        const selectedCards = this.cardsOnTheTable.filter(card => card.selected);
        if(selectedCards.length < 3) return;
        if(selectedCards.length > 3) throw Error("Whoops!  Too many cards selected")

        if(this.isASet2(selectedCards))
        {
            selectedCards.forEach(c => {
                const cardIndex = this.cardsOnTheTable.indexOf(c);
                this.cardsOnTheTable.splice(cardIndex, 1, this.allCardsInDeck[0]);
                this.allCardsInDeck.splice(0,1);
            })

            this.numberOfSets+=1;
            this.setMessage = "is a set!";
        }
        else {
            selectedCards.forEach(c => c.selected = false);
            this.setMessage = "is not a set!";            
        }
    }

}