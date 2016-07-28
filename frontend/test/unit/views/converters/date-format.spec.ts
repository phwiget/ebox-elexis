
import {DateFormatValueConverter} from "../../../../src/views/common/converters/date-format";


describe('the date format converter', () => {

    var converter: DateFormatValueConverter;

    beforeEach(() => {

        converter = new DateFormatValueConverter();

    });

    it('returns all medications for a patient id from the web or the local cache', () => {

        var x;
        expect(converter.toView(1469613081000)).toBe("27.7.2016");
        expect(converter.toView(x)).toBe("");
        
    });


});