
export class IsNumericValueConverter {

    toView(value) {

        return !isNaN(value);
        
    }

}