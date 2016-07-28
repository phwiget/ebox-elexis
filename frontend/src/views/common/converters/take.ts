
export class TakeValueConverter {
    toView(array, count) {

        if (array===undefined || array === null) {return array;}
        return array.slice(0, count);

    }
}

  