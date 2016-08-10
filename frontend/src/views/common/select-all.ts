import {autoinject} from 'aurelia-framework';

@autoinject
export class SelectAllCustomAttribute {

    el: HTMLInputElement;
    value: boolean;

    constructor(private element:  Element){

        this.el = <HTMLInputElement>element;

        var self = this;
        
        this.el.addEventListener('focus', () => {

            self.el.select();
            
        });

    }

}