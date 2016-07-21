import {Constants} from '../../../src/models/constants';

describe('the Constants for testing purposes', () => {
    var constants;

    beforeEach(() => {

        constants = new Constants();
    });

    it('returns some values', () => {

        expect(constants.hambugerMenuClass).toBe(".hamburger");
        expect(constants.pageSelector).toBe("#my-wrapper");
        expect(constants.navbarMenu).toBe("#phm-mmenu");

    });


});
