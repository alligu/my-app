import { action, Lambda, makeObservable, observable } from "mobx";
import { AppModel } from "./AppModel";



export class SetCardModel{
    shape:string="circle";
    color:string="red";
    count:number=3;
    pattern:string="solid";
    onSelected: ()=>void
    
    @observable private _selected:boolean=false;
    get selected() {
        return this._selected
    }
    set selected(value: boolean) { 
        action(()=>{ this._selected = value;})() 
        if (value) {
            this.onSelected();
        }
    }


    get key() {return `${this.count}${this.color}${this.pattern}${this.shape}`;}

    constructor(shape:string, color:string, count:number, pattern:string, onSelected: ()=>void) {

        this.onSelected = onSelected;
        makeObservable(this);
        this.shape = shape;
        this.color = color;
        this.count = count;
        this.pattern = pattern;
    }
}