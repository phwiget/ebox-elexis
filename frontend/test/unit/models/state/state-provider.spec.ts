import {StateProvider} from "../../../../src/models/state/state-provider";
import {Medication} from "../../../../src/views/medication/medication";

describe('the state provider', () => {

    var provider;

    beforeEach(() => {
        provider = new StateProvider();
    });

    it('stores stateful properties for an enhanced UX', () => {

        var self = {statefulProperties: ['a','b','c'], a: null, b:null, c:null, d:1};
        var selfUpdated = {statefulProperties: ['a','b','c'], a: 1, b:2, c:3, d:4};

        provider.setState(selfUpdated);
        provider.getState(self);

        expect(self.a).toBe(1);
        expect(self.b).toBe(2);
        expect(self.c).toBe(3);
        expect(self.d).toBe(1);

    });


});
