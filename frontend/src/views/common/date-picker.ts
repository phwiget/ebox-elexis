import {autoinject} from "aurelia-dependency-injection";
import 'bootstrap-datepicker';
import {bindable} from "aurelia-framework";

declare var $;

@autoinject()
export class DatePickerCustomAttribute{

    @bindable format = 'dd.mm.yyyy';
    @bindable onDateChanged = (ev, scope) => null;
    @bindable scope = null;
    @bindable model = null;
    @bindable close: boolean = true;

    private element: HTMLElement;
    private datePicker: any;

    constructor(element: Element){

        var self = this;
        this.element = <HTMLElement>element;
        
    }

    attached(){

        var self = this;

        this.datePicker = $(self.element);

        this.datePicker.datepicker({
            format: this.format,
            weekStart:1
        }).on('changeDate', function(ev){

            self.model = ev.date.getTime();
            self.onDateChanged(ev.date,self.scope);

        });

        if (this.model != null){
            this.datePicker.datepicker('setValue', this.toDate(this.model));
        }

    }
    modelChanged(newValue,oldValue){

        if (this.datePicker != null){
            this.datePicker.datepicker('setValue', this.toDate(newValue));
        }

    }

    unbind(){
        this.datePicker.remove();
        $(".datepicker.dropdown-menu").remove();
    }

    private toDate(d: number){

        let date = new Date(d);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0).getTime();

    }

}