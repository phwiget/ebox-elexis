import {bindable} from "aurelia-framework";


export class Pagination{

    @bindable maxSize: number = 5;
    @bindable itemsPerPage: number = 10;
    @bindable totalItems: Array<any>;
    @bindable currentPage: number = 1;
    @bindable onChange: any = null;
    @bindable boundaries: boolean = false;

    private pages: number;
    visiblePages: Array<number> = [];

    bind(bindingContext: Object, overrideContext: Object){

        if (this.totalItems === undefined){this.totalItems = [];}

        this.pages = Math.ceil(this.totalItems.length/this.itemsPerPage);
        this.selectFirstPage();

    }

    private selectFirstPage(){

        this.currentPage = 1;
        this.visiblePages = [];

        for (var i = this.currentPage; i <= Math.min(this.currentPage + this.maxSize -1, this.pages); i++) {
            this.visiblePages.push(i);
        }

    }

    totalItemsChanged(newValue:Array<any>, oldValue: Array<any>){

        this.pages = Math.ceil(this.totalItems.length/this.itemsPerPage);
        this.selectFirstPage();
        
    }
    onPageChanged(newPage: number){

        this.currentPage = newPage;
        if (this.onChange){this.onChange(newPage);}

    }
    onLeft(){
        if (this.currentPage > 1){
            this.currentPage -= 1;
            this.updatePages();
            this.onPageChanged(this.currentPage);
        }
    }

    onRight(){
        if (this.currentPage < this.pages){
            this.currentPage += 1;
            this.updatePages();
            this.onPageChanged(this.currentPage);
        }
    }

    toFirst(){

        this.selectFirstPage();
    }

    toLast(){

        this.currentPage = this.pages;
        this.visiblePages = [];

        for (var i = Math.max(this.pages-this.maxSize+1,1); i <= this.currentPage; i++) {
            this.visiblePages.push(i);
        }

    }

    private updatePages(){

        let margin = Math.round(this.maxSize/2);

        if (this.currentPage > margin-1 && this.currentPage <= this.pages - margin+1){
            this.visiblePages = [];

            var start = this.currentPage-margin+1;
            for (var i = start; i <= Math.min(start + this.maxSize -1, this.pages); i++) {
                this.visiblePages.push(i);
            }

        }

    }

}