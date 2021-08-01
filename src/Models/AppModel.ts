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

    checkForSet() {
        let selectedCount = 0;
        var selectedCards = [];

        for (let i = 0; i < this.cardsOnTheTable.length; i++) {
            if (this.cardsOnTheTable[i].selected) {
                selectedCount+=1;
                selectedCards.push(this.cardsOnTheTable[i]);
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
            if (diffShape && sameColor && sameCount && samePattern) {
                isASet = true;
            }
            if (sameShape && diffColor && sameCount && samePattern) {
                isASet = true;
            }
            if (sameShape && sameColor && diffCount && samePattern) {
                isASet = true;
            }
            if (sameShape && sameColor && sameCount && diffPattern) {
                isASet = true;
            }
            
            // two same, two different
            if (diffShape && diffColor && sameCount && samePattern) {
                isASet = true;
            }
            if (diffShape && sameColor && diffCount && samePattern) {
                isASet = true;
            }  
            if (diffShape && sameColor && sameCount && diffPattern) {
                isASet = true;
            }  
            if (sameShape && diffColor && diffCount && samePattern) {
                isASet = true;
            }    
            if (sameShape && diffColor && sameCount && diffPattern) {
                isASet = true;
            }               
            if (sameShape && sameColor && diffCount && diffPattern) {
                isASet = true;
            }  
            
            // three diff, one same
            if (sameShape && diffColor && diffCount && diffPattern) {
                isASet = true;
            }    
            if (diffShape && sameColor && diffCount && diffPattern) {
                isASet = true;
            }
            if (diffShape && diffColor && sameCount && diffPattern) {
                isASet = true;
            }
            if (diffShape && diffColor && diffCount && samePattern) {
                isASet = true;
            }     
            
            if (isASet) {
                alert("is a set!");
            } else {
                alert("is not a set");
            }

        }

    }

}