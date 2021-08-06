import { makeObservable, observable } from "mobx";
import { SetCardModel } from "./SetCardModel";

export class AppModel {
    @observable cardsOnTheTable: SetCardModel[];
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
        for (let i = this.allCardsInDeck.length - 1; i > 0; i--) {
            //Math.floor(Math.random() * (max - min + 1)) + min - min and max both included
            let j = Math.floor(Math.random() * (this.allCardsInDeck.length));
            let temp = this.allCardsInDeck[i];
            this.allCardsInDeck[i] = this.allCardsInDeck[j];
            this.allCardsInDeck[j] = temp;

        }
        
        this.cardsOnTheTable = this.allCardsInDeck.slice(0,12);
        this.allCardsInDeck = this.allCardsInDeck.slice(12);

    }

    checkForSet() {
        let selectedCount = 0;
        var selectedCards = [];
        var selectedCardsIndices = [];

        for (let i = 0; i < this.cardsOnTheTable.length; i++) {
            if (this.cardsOnTheTable[i].selected) {
                selectedCount+=1;
                selectedCards.push(this.cardsOnTheTable[i]);
                selectedCardsIndices.push(i);
            }

        }

        var sameShape = false;
        var diffShape = false;
        var sameColor = false;
        var diffColor = false;
        var sameCount = false;
        var diffCount = false;
        var samePattern = false;
        var diffPattern = false;

        var isASet = false;

        if (selectedCount === 3) {
            if (selectedCards[0].shape === selectedCards[1].shape && selectedCards[1].shape === selectedCards[2].shape) {
                sameShape = true;
            } else if (selectedCards[0].shape !== selectedCards[1].shape && selectedCards[1].shape !== selectedCards[2].shape && selectedCards[0].shape !== selectedCards[2].shape) {
                diffShape = true;
            }

            if (selectedCards[0].color === selectedCards[1].color && selectedCards[1].color === selectedCards[2].color) {
                sameColor = true;
            } else if (selectedCards[0].color !== selectedCards[1].color && selectedCards[1].color !== selectedCards[2].color && selectedCards[0].color !== selectedCards[2].color) {
                diffColor = true;
            }
            
            if (selectedCards[0].count === selectedCards[1].count && selectedCards[1].count === selectedCards[2].count) {
                sameCount = true;
            } else if (selectedCards[0].count !== selectedCards[1].count && selectedCards[1].count !== selectedCards[2].count && selectedCards[0].count !== selectedCards[2].count) {
                diffCount = true;
            }
            
            if (selectedCards[0].pattern === selectedCards[1].pattern && selectedCards[1].pattern === selectedCards[2].pattern) {
                samePattern = true;
            } else if (selectedCards[0].pattern !== selectedCards[1].pattern && selectedCards[1].pattern !== selectedCards[2].pattern && selectedCards[0].pattern !== selectedCards[2].pattern) {
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
            
            if (isASet) {
                for (let i = 0; i < 3; i++) {
                    this.cardsOnTheTable.splice(selectedCardsIndices[i], 1, this.allCardsInDeck[0]);
                    this.allCardsInDeck = this.allCardsInDeck.slice(1);
                }
                this.numberOfSets+=1;
                //alert("is a set!");
            } else {
                for (let i = 0; i < 3; i++) {
                    this.cardsOnTheTable[selectedCardsIndices[i]].selected = false;

                }
                selectedCount = 0;
                selectedCards = [];
                selectedCardsIndices = [];
                //alert("is not a set!");
            }

        }

    }

}