import {FilterValueConverter} from "./filter";

export class ShowValueConverter {

    toView(array: Array<any>, expression: string, limit: number) {

        var filter = new FilterValueConverter();

        if (array == null) {return false;}
        if (expression == null) return array.length > limit;

        return filter.toView(array,expression).length > limit;

    }

}
