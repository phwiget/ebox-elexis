
export class SortValueConverter {
    toView(array: Array<any>, propertyName: string, asc: boolean = true) {
        let factor = asc ? 1 : -1;

        if (array===undefined) {return array;}

        return array.sort((a, b) => {
            return this.sort(a,b,propertyName,factor)
        });
    }

    private sort(a,b, propertyName: string, factor: number){

        var properties = propertyName.split(".");
        var tail = properties.slice(1, properties.length);

        var elementA = a[properties[0]];
        var elementB = b[properties[0]];

        var valueType = '';
        if (typeof elementA === 'string' || elementA instanceof String){valueType = 'string';}
        
        tail.map(p => {

           if (elementA !== undefined){
               elementA = elementA[p];
               if (typeof elementA === 'string' || elementA instanceof String){valueType = 'string';}
           }
            if (elementB !== undefined){
                elementB = elementB[p];
            }
        });


        if (elementA === undefined){return factor;}
        if (elementB === undefined){return -1*factor;}

        if (valueType === 'string'){

            var nameA=elementA.toLowerCase(), nameB=elementB.toLowerCase();

            if (nameA < nameB) //sort string ascending
                return -1*factor;
            if (nameA > nameB)
                return factor;
            return 0;

        } else {
            return (elementA - elementB) * factor;
        }

    }
}

  