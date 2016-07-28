
import {PaginateValueConverter} from "../../../../src/views/common/converters/paginate";


describe('the paginate value converter', () => {

    var converter: PaginateValueConverter;

    beforeEach(() => {

        converter = new PaginateValueConverter();

    });

    it('all items to be displayed', () => {

        var result = converter.toView([1,2,3,4,5,6,7,8,9], 1,5);
        expect(result.length).toBe(5);
        expect(result[0]).toBe(1);
        expect(result[4]).toBe(5);

        var result = converter.toView([1,2,3,4,5,6,7,8,9], 2,5);
        expect(result.length).toBe(4);
        expect(result[0]).toBe(6);
        expect(result[3]).toBe(9);

        var result = converter.toView([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 2,5);
        expect(result.length).toBe(5);
        expect(result[0]).toBe(6);
        expect(result[4]).toBe(10);

    });


});