
export class FilterValueConverter {


    toView(array: Array<any>, expression: string) {

        if (array== null || expression == null || expression === "") {return array;}

        return this.filterArray(array, expression.toLowerCase());

    }


    private filterObject(obj: Object, expression: string): boolean{

        return Object.keys(obj).map(k => {

            var child = obj[k];

            if (child == null) return false;
            else if (typeof  child === 'object') return this.filterObject(child,expression);
            else if (child.constructor === Array) return this.filterArray(child, expression).length > 0;
            else return child.toString().toLowerCase().indexOf(expression) > -1;
                        
        }).filter(r => r).length > 0;

    }


    private filterArray(array, expression: string): Array<any> {

        return array.filter(el => {return this.filterObject(el, expression);});

    }
}
