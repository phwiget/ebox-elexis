import {autoinject} from 'aurelia-framework';
import {customAttribute} from "aurelia-templating";

@autoinject
export class FocusMeCustomAttribute {

    el: HTMLElement;
    value: boolean;

    constructor(private element:  Element){

        this.el = <HTMLElement> this.element;

    }

    valueChanged(newValue: boolean, oldValue: boolean){

        {newValue ? this.el.focus() : void(0); }

    }

    attached(){

        if (this.value){this.el.focus();}

    }

}
