import {FilterValueConverter} from "./filter";

export class LengthValueConverter {

    toView(array: Array<any>, expression: string) {

        var filter = new FilterValueConverter();

        if (array == null) {return 0;}
        if (expression == null) return array.length;

        return filter.toView(array,expression).length;

    }

  }
