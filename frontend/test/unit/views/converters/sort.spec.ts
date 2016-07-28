
import {SortValueConverter} from "../../../../src/views/common/converters/sort";


describe('the sort converter', () => {

    var converter: SortValueConverter;

    beforeEach(() => {

        converter = new SortValueConverter();

    });

    it('returns all items in the right order', () => {

        var test = [{id:1, value:"acc"},{id:2, value:"z"},{id:3, value:"d"}];

        var result = converter.toView(test,'id');
        expect(result.length).toBe(3);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
        expect(result[2].id).toBe(3);

        result = converter.toView(test,'id', false);
        expect(result[0].id).toBe(3);
        expect(result[1].id).toBe(2);
        expect(result[2].id).toBe(1);

        result = converter.toView(test,'value', true);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(3);
        expect(result[2].id).toBe(2);

        result = converter.toView(test,'value', false);
        expect(result[0].id).toBe(2);
        expect(result[1].id).toBe(3);
        expect(result[2].id).toBe(1);

        var test = [{id:1, value:"acc"}, {value:"e"},{id:2, value:"z"},{id:3, value:"d"}];

        var result = converter.toView(test,'id');
        expect(result.length).toBe(4);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
        expect(result[2].id).toBe(3);
        expect(result[3].value).toBe("e");

        var test = [{id:1, value:"acc"}, {id:4},{id:2, value:"z"},{id:3, value:"d"}];

        var result = converter.toView(test,'value');
        expect(result.length).toBe(4);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(3);
        expect(result[2].id).toBe(2);
        expect(result[3].id).toBe(4);

        var test = [{id:1, value:"acc", obj: {"nested":"p"}},{id:2, value:"z", obj: {"nested":"y"}}, {id:4},{id:3, value:"d", obj: {"nested":"s"}}];
        var result = converter.toView(test,'obj.nested');
        expect(result.length).toBe(4);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(3);
        expect(result[2].id).toBe(2);
        expect(result[3].id).toBe(4);

    });


});