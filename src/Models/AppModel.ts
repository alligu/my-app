import { makeObservable, observable } from "mobx";
import { SetCardModel } from "./SetCardModel";

export class AppModel {
    @observable cardsOnTheTable: SetCardModel[];
    @observable setMessage?: string;
    allCardsInDeck: SetCardModel[];
    numberOfSets: number;


    // HOMEWORK:  Display different screens depending on the game state
    @observable gameState: 'starting' | 'playing' | 'over';


    /*
    start of game
    deck of cards
    shuffle deck of cards
    place top 12 cards on the table
	check if set exists in cards
	if set does not exist, 
		if there are no more cards remaining in the deck, game over
		else
			place 3 more cards on the table
				if set still does not exist keep placing 3 cards until a set exists

    player touches 3 cards
    on the third card, computer checks if it is a set
    if it is not a set, cards are unselected and left on the table
    if it is a set
        3 cards are removed
            
        while there are less than 12 cards
            add card from remaining deck is placed on the table
        check if set exists in cards
        if set does not exist, 
            if there are no more cards remaining in the deck, game over
            else
                place 3 more cards on the table
                    if set still does not exist keep placing 3 cards until a set exists

    */

    constructor() {
        makeObservable(this);
        this.numberOfSets = 0;
        this.allCardsInDeck =[];
        this.gameState = "starting";
        ["square","triangle","circle"].forEach(shape => {
            ["blue","green","red"].forEach(color => {
                [1,2,3].forEach(count => {
                    ["stripes","solid","clear"].forEach(pattern => {
                        this.allCardsInDeck.push(new SetCardModel(shape, color, count, pattern, () => this.handleSelectedCard()));                              
                    })            
                })
            })
        })

        //setInterval(()=>{this.numberOfSets++}, 1000)

        // random cards
        this.randomizeCards();
        
        
        this.cardsOnTheTable = observable(this.allCardsInDeck.slice(0,12));
        this.allCardsInDeck = this.allCardsInDeck.slice(12);

        this.resolveTable();
    }


    resolveTable() {
        while (!this.setExistsOnTable()) {
            // 	if there are no more cards remaining in the deck, game over
            if (this.allCardsInDeck.length == 0) {
                this.gameState = "over";
            } else {
	        // 	place 3 more cards on the table
                this.cardsOnTheTable.unshift(...this.allCardsInDeck.splice(0, 3));
               
            }
        }
    }

    randomizeCards() {
        for (let i = this.allCardsInDeck.length - 1; i > 0; i--) {
            //Math.floor(Math.random() * (max - min + 1)) + min - min and max both included
            let j = Math.floor(Math.random() * (this.allCardsInDeck.length));
            let temp = this.allCardsInDeck[i];
            this.allCardsInDeck[i] = this.allCardsInDeck[j];
            this.allCardsInDeck[j] = temp;

            
        }
        

    }
    /*
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
    */


    isASet(cards: SetCardModel[]) {
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


    // player touches 3 cards
    // on the third card, computer checks if it is a set
    // if it is not a set, cards are unselected and left on the table
    // if it is a set
    //     3 cards are removed
            
    //     while there are less than 12 cards
    //         add card from remaining deck is placed on the table
    //     check if set exists in cards
    //     if set does not exist, 
    //         if there are no more cards remaining in the deck, game over
    //         else
    //             place 3 more cards on the table
    //                 if set still does not exist keep placing 3 cards until a set exists

    handleSelectedCard() {
        const selectedCards = this.cardsOnTheTable.filter(card => card.selected);
        if(selectedCards.length < 3) return;
        if(selectedCards.length > 3) throw Error("Whoops! Too many cards selected")

        const cards = 
        [   "C","C","C",
            "C","C","C", 
            "C"," ","C", 
            "C","C"," ", 
            "C"," ","C", 
    ]

        if(this.isASet(selectedCards))
        {
            // Homework:   handle the case where there are 15 cards - should not try to add more cards
            //                  instead, collapse down to 4x3 matrix
            //
            //              CCCCC       C___C       CCCC_
            //              CCCCC >>>   CCCCC  >>>  CCCC_
            //              CCCCC       CCCCC       CCCC_
            //              
            //

            selectedCards.forEach(c => {
                const cardIndex = this.cardsOnTheTable.indexOf(c);
                this.cardsOnTheTable.splice(cardIndex, 1, this.allCardsInDeck[0]);
                this.allCardsInDeck.splice(0,1);
            })

            this.numberOfSets+=1;
            this.setMessage = "is a set!";
            this.setExistsOnTable();  // homework: change this to resolve table
        }
        else {
            selectedCards.forEach(c => c.selected = false);
            this.setMessage = "is not a set!";            
        }
    }

    setExistsOnTable() {
        //this.cardsOnTheTable
        let setExists = false;
        for (let i = 0; i < this.cardsOnTheTable.length - 2; i++) {
            for (let j = i + 1; j < this.cardsOnTheTable.length - 1; j++) {
                for (let k = j + 1; k < this.cardsOnTheTable.length; k++) {
                    const set = [this.cardsOnTheTable[i], this.cardsOnTheTable[j], this.cardsOnTheTable[k]];
                    if (this.isASet(set)) {
                        setExists = true;
                        console.log(i);
                        console.log(j);
                        console.log(k);
                    }
                    if (setExists) {
                        break;
                    }
                }
                if (setExists) {
                    break;
                }
            }
            if (setExists) {
                break;
            }
        }
        return setExists;
        //if (!setExists) {
        //    this.randomizeCards();
        // //   this.checkSetExists();
        //}
    }

}