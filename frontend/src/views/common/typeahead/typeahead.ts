import {autoinject} from "aurelia-dependency-injection";
import 'typeahead.js';
import {bindable} from "aurelia-framework";

declare var $;
// declare var HandleBars;

@autoinject()
export class TypeaheadCustomAttribute{

    @bindable minLength = 1;
    @bindable highlight = true;
    @bindable source = null;
    @bindable onSelected = null;
    @bindable scope = null;
    @bindable hint = true;
    @bindable display = JSON.stringify;
    @bindable onEmpty: string = 'no matches';

    private element: Element;
    private typeahead: any;
    private timerId: number = null;
    private lastSelection: any = null;

    constructor(element: Element){

        this.element = element;
        var self = this;
        
        this.element.addEventListener('focus', function(){
            
            var el = <HTMLInputElement>self.element;
            el.select();

        });

    }

    bind(bindingContext: Object, overrideContext: Object){

        var self = this;
        this.typeahead = $(self.element);

        var wrapper = function(query, syncCallback, asyncCallback){

            if (self.lastSelection === query) {return;}
            if(self.timerId) {clearTimeout(self.timerId)}

            self.timerId = setTimeout(
                function() {
                    self.source(query, self.scope).then(r =>{
                        self.timerId  = null;
                        asyncCallback(r);
                    });
                },
                500
            );

        };

        this.typeahead.typeahead({
                hint: self.hint,
                highlight: self.highlight,
                minLength: self.minLength
            },
            {
                name: 'entities',
                source: wrapper,
                display: self.display,
                templates: {
                    empty: '<div class="empty-message">' + self.onEmpty + '</div>'
                }
            })
        .bind('typeahead:select', function(ev, selected) {
            if(self.onSelected){
                
                self.lastSelection = self.display(selected);
                self.onSelected(selected, self.scope);
                selected = {};

            }
        });
    }

    unbind(){
        this.typeahead.typeahead('destroy');
    }

}