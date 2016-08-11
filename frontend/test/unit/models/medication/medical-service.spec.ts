import {MedicationService} from "../../../../src/models/medication/medication-service";
import {HttpService} from "../../../../src/models/http/http-service";

declare var jsRoutes;

describe('the medication service', () => {

    var service,httpService;

    beforeEach(() => {
    
        httpService = new HttpService();

        httpService.get = function(){

            return Promise.resolve({response:[{"instructions":"test"}]});

        };
        
        service = new MedicationService(httpService);

    });

    it('returns all medications for a patient id from the web or the local cache', (done) => {

        service.list("id").then(p => {

            expect(p[0].dosage).toBe("test");
            expect(service.cache["medications_id"]!==undefined).toBe(true);

            jsRoutes = {};

            service.list("id").then(p => {

                expect(p[0].dosage).toBe("test");
                done();
            });

            done();
        });



    });

    it('updates the cache', () => {

        service.cache = {"a" : [{id:"id", value:"initial"},{id:"id2", value:"test"}], "b" : {test:"test2"}};
        service.updateCache({id:"id", value:"final"}, "a",service);
        service.updateCache({id:"idid", value:"final"}, "c",service);
        expect(service.cache["a"][0].value).toBe("final");
        expect(service.cache["b"].test).toBe("test2");

    });

});