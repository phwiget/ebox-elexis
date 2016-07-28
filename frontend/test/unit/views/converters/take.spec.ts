
import {TakeValueConverter} from "../../../../src/views/common/converters/take";


describe('the take converter', () => {

    var converter: TakeValueConverter;

    beforeEach(() => {

        converter = new TakeValueConverter();

    });

    it('returns all elements up to n', () => {

        var result = converter.toView([1,2,3,4,5], 3);
        expect(result.length).toBe(3);
        var x;
        expect(converter.toView(x, 3)).toBe(x);
        
    });


});