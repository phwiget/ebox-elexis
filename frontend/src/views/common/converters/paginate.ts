
export class PaginateValueConverter {
    toView(array, currentPage, itemsPerPage) {

        if (array== null) {return array;}

        var begin = (currentPage -1)*itemsPerPage;
        var end = Math.min(begin + itemsPerPage,array.length);

        return array.slice(begin, end);

    }
}