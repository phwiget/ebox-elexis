import {FilterValueConverter} from "./filter";

export class LengthValueConverter {

    toView(array: Array<any>, expression: string) {

        var filter = new FilterValueConverter();

        if (array===undefined || array === null) {return 0;}
        if (expression === undefined || expression === null) return array.length;

        return filter.toView(array,expression).length;

    }

  }
