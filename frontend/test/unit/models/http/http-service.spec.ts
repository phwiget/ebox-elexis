import {HttpService} from "../../../../src/models/http/http-service";

declare var document;

describe('the HttpService', () => {

    var service;

    beforeEach(() => {

        service = new HttpService();
        document.cookie = "XSRF-TOKEN=7c113365d3c2cdedbe26751497a96b3452229e28-1469013986010-372845198ddc1b66e785a1f3";

    });

    it('returns all cookies', () => {

        expect(service.cookies()).toBe("XSRF-TOKEN=7c113365d3c2cdedbe26751497a96b3452229e28-1469013986010-372845198ddc1b66e785a1f3");

    });

    it('returns the CSRF-Token for the Play App', () => {

        expect(service.csrfToken()).toBe("7c113365d3c2cdedbe26751497a96b3452229e28-1469013986010-372845198ddc1b66e785a1f3");

    });

});