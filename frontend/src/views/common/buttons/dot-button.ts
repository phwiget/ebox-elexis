import {autoinject} from 'aurelia-framework';

@autoinject
export class DotButtonCustomAttribute {

  el: HTMLElement;

  constructor(private element:  Element){

    this.el = <HTMLElement> this.element;
    this.el.classList.add("dot-button");

  }

  private spinnerExists(){
    return this.el.getElementsByClassName("spinner").length > 0;
  }

  valueChanged(newValue: boolean, oldValue: boolean){

    if (!this.spinnerExists()){
      this.attached();
    }

    {newValue ? this.el.classList.add("dot-button-loading") : this.el.classList.remove("dot-button-loading")}

  }

  attached() {

    var h: string = this.el.offsetHeight*0.5 + "px";

    var spinner = `<div class="spinner" style="height:${h};width:${h}"></div>`;

    this.el.innerHTML = this.el.innerHTML + spinner
  }

}


