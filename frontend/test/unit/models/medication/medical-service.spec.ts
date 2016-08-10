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

    it('concat the dosage to the medication', () =>{

        var m1 = {"id":"addef970c6e9359a10210","status":"active","dateWritten":1469613466000,"article":"VICTOZA 6 mg/ml 2 3 ml Inj lös","instructions":"2-1-1-0", "dosage":""};
        var m2 = {"id":"F53e80ca672ea469034","status":"active","notes":"Vor dem Essen","dateWritten":1470230670000,"article":"IBUPROFEN actavis 600 mg Filmtabl","instructions":"Morgens und Abends","additionalInstructions":"Test","dosage":""};

        service.concatInstructions(m1);
        service.concatInstructions(m2);

        expect(m1.dosage).toBe("2-1-1-0");
        expect(m2.dosage).toBe("Morgens und Abends, Test");


    });

    it('extracts the individual dosage', () =>{

        var m1 = {"id":"addef970c6e9359a10210","status":"active","dateWritten":1469613466000,"article":"VICTOZA 6 mg/ml 2 3 ml Inj lös","instructions":"2-1-1-0", "dosage":""};
        var m2 = {"id":"F53e80ca672ea469034","status":"active","notes":"Vor dem Essen","dateWritten":1470230670000,"article":"IBUPROFEN actavis 600 mg Filmtabl","instructions":"Morgens und Abends","additionalInstructions":"Test","dosage":""};
        var m3 = {"id":"addef970c6e9359a10210","status":"active","dateWritten":1469613466000,"article":"VICTOZA 6 mg/ml 2 3 ml Inj lös","instructions":"2-1-1.5-0.3", "dosage":""};

        var r1 = service.extractPosology(m1);
        var r2 = service.extractPosology(m2);
        var r3 = service.extractPosology(m3);

        expect(r1.posology.morning).toBe(2);
        expect(r1.posology.midday).toBe(1);
        expect(r1.posology.evening).toBe(1);
        expect(r1.posology.night).toBe(0);

        expect(r2.posology).toBe(undefined);

        expect(r3.posology.evening).toBe(1.5);
        expect(r3.posology.night).toBe(0.3);
    });

    it('adds the posology to the instructions', ()=>{

        var m1 = {id: 'addef970c6e9359a10210', status: 'active', dateWritten: 1469613466000, article: 'VICTOZA 6 mg/ml 2 3 ml Inj lös',instructions:undefined, dosage: '', posology: {morning: 2, midday: 1, evening: 1, night: 0}};
        var m2 = {id: 'addef970c6e9359a10210', status: 'active', dateWritten: 1469613466000, article: 'VICTOZA 6 mg/ml 2 3 ml Inj lös',instructions:undefined, dosage: '', posology: {morning: 2, midday: 1,night: 0}};

        service.addInstructions(m1);
        service.addInstructions(m2);

        expect(m1.instructions).toBe('2-1-1-0');
        expect(m2.instructions).toBe('2-1-0-0');

    })

});