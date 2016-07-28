
export class LimitValueConverter {
    toView(array, from, to) {

        if (array== null) {return array;}
        return array.slice(from, to);

    }
}

  