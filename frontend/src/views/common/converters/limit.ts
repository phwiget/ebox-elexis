
export class LimitValueConverter {
    toView(array, from, to) {

        if (array===undefined || array === null) {return array;}
        return array.slice(from, to);

    }
}

  