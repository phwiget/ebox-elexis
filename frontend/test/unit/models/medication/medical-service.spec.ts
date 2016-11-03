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

        service.cache = {
            "medications_a" : [{id:"id", value:"initial", isHistory: false},{id:"id2", value:"test"}], 
            "medications_b" : [{test:"test2"}],
            "history_a": [{id:"id", value:"initial", isHistory: false},{id:"id2", value:"test"}]
        };
        
        service.updateCache("a", "idNew", {id:"id", value:"final"}, "a",service);
        service.updateCache("b","", {id:"idid", value:"final"}, "c",service);
        service.updateCache("c","", {id:"idid", value:"final"}, "c",service);


        expect(service.cache["medications_a"][0].value).toBe("test");
        expect(service.cache["medications_a"][0].id).toBe("id2");
        expect(service.cache["medications_a"][1].id).toBe("idNew");
        expect(service.cache["medications_a"][1].value).toBe("final");

        expect(service.cache["history_a"][0].value).toBe("initial");
        expect(service.cache["history_a"][0].isHistory).toBe(true);
        expect(service.cache["history_a"][1].id).toBe("id2");
        expect(service.cache["history_a"][1].value).toBe("test");
        expect(service.cache["history_a"][2].id).toBe("idNew");
        expect(service.cache["history_a"][2].value).toBe("final");

        expect(service.cache["medications_b"][0].test).toBe("test2");

    });

});