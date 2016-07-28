
export class DateFormatValueConverter {

    toView(value) {

        if (value == null){return "";}

        var date = new Date(value);
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        
        return dd + "." + mm + "." + date.getFullYear();
    }

}