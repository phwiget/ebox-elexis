
export class FilterValueConverter {

    toView(array: Array<any>, expression: string) {

        if (array===undefined || array === null || expression === undefined || expression === null) {return array;}

        return this.filterArray(array, expression.toLowerCase());

    }

    private filterObject(obj: Object, expression: string): boolean{

        var match;

        for (var i in obj){

            var child;

            obj.hasOwnProperty(i) ? child = obj[i] : child = obj;

            (child !== null && typeof child === 'object') ? match = this.filterObject(child,expression) :

                (Object.prototype.toString.call(child) === '[object Array]' ) ? match = this.filterArray(child, expression) :

                    (child === undefined) ? match= false: match = child.toString().toLowerCase().indexOf(expression) !== -1;

            if (match){break;}
        }

        return match;
    }

    private filterArray(array, expression: string) {

        return array.filter(el => {return this.filterObject(el, expression);});

    }
}
