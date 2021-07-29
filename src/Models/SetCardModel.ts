import { makeObservable, observable } from "mobx";

export class SetCardModel{
    shape:string="circle";
    color:string="red";
    count:number=3;
    pattern:string="solid";
    @observable selected:boolean=false;

    get key() {return `${this.count}${this.color}${this.pattern}${this.shape}`;}

    constructor(shape:string, color:string, count:number, pattern:string) {
        makeObservable(this);
        this.shape = shape;
        this.color = color;
        this.count = count;
        this.pattern = pattern;
    }
}