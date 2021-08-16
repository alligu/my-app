import { action, makeObservable, observable } from "mobx";

export class SetCardModel{
    shape:string="circle";
    color:string="red";
    count:number=3;
    pattern:string="solid";
    
    @observable private _selected:boolean=false;
    get selected() {return this._selected}
    set selected(value: boolean) { action(()=>{ this._selected = value;})() }


    get key() {return `${this.count}${this.color}${this.pattern}${this.shape}`;}

    constructor(shape:string, color:string, count:number, pattern:string) {
        makeObservable(this);
        this.shape = shape;
        this.color = color;
        this.count = count;
        this.pattern = pattern;
    }
}