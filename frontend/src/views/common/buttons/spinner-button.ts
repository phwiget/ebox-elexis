
import {autoinject} from 'aurelia-framework';

@autoinject
export class SpinnerButtonCustomAttribute {

  el: HTMLElement;

  constructor(private element:  Element){

    this.el = <HTMLElement> this.element;
    this.el.classList.add("spinner-button");

  }

  valueChanged(newValue: boolean, oldValue: boolean){

    if (newValue) {
      this.el.classList.add("spinner-button-loading");
    } else {
      this.el.classList.remove("spinner-button-loading");
    }

  }

  attached(){

    var h: string = this.el.offsetHeight*0.75 + "px";

    var spinner =
      `<div class="sk-cube-grid" style="height:${h};width:${h}">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>`;

    this.el.innerHTML = this.el.innerHTML + spinner;

  }
  

}


