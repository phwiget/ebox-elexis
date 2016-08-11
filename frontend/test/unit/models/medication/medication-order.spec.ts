

import {MedicationOrder} from "../../../../src/models/medication/medication-order";
describe('the medication order', () => {

    it('concat the dosage to the medication', () =>{

        var m1 = {"id":"addef970c6e9359a10210","status":"active","dateWritten":1469613466000,"article":"VICTOZA 6 mg/ml 2 3 ml Inj lös","instructions":"2-1-1-0"};
        var m2 = {"id":"F53e80ca672ea469034","status":"active","notes":"Vor dem Essen","dateWritten":1470230670000,"article":"IBUPROFEN actavis 600 mg Filmtabl","instructions":"Morgens und Abends","additionalInstructions":"Test"};

        var mo1 = new MedicationOrder(Object.assign(m1));
        var mo2 = new MedicationOrder(Object.assign(m2));

        expect(mo1.dosage).toBe("2-1-1-0");
        expect(mo2.dosage).toBe("Morgens und Abends, Test");


    });

    it('extracts the individual dosage', () =>{

        var m1 = {"id":"addef970c6e9359a10210","status":"active","dateWritten":1469613466000,"article":"VICTOZA 6 mg/ml 2 3 ml Inj lös","instructions":"2-1-1-0"};
        var m2 = {"id":"F53e80ca672ea469034","status":"active","notes":"Vor dem Essen","dateWritten":1470230670000,"article":"IBUPROFEN actavis 600 mg Filmtabl","instructions":"Morgens und Abends","additionalInstructions":"Test"};
        var m3 = {"id":"addef970c6e9359a10210","status":"active","dateWritten":1469613466000,"article":"VICTOZA 6 mg/ml 2 3 ml Inj lös","instructions":"2-1-1.5-0.3"};

        var r1 = new MedicationOrder(Object.assign(m1));
        var r2 = new MedicationOrder(Object.assign(m2));
        var r3 = new MedicationOrder(Object.assign(m3));

        expect(r1.posology.morning).toBe(2);
        expect(r1.posology.midday).toBe(1);
        expect(r1.posology.evening).toBe(1);
        expect(r1.posology.night).toBe(0);

        expect(r2.posology).toBe(undefined);

        expect(r3.posology.evening).toBe(1.5);
        expect(r3.posology.night).toBe(0.3);
    });

    it('updates the medication', ()=>{

        var m1 = {id: 'addef970c6e9359a10210', status: 'active', dateWritten: 1469613466000, article: 'VICTOZA 6 mg/ml 2 3 ml Inj lös',instructions:undefined, posology: {morning: 2, midday: 1, evening: 1, night: 0}};


        var r1 = new MedicationOrder(Object.assign(m1));

        expect(r1.instructions).toBe(undefined);

        r1.update();
        expect(r1.instructions).toBe('2-1-1-0');

        r1.hasBeenStopped = true;
        expect(r1.dateEnded).toBe(undefined);

        r1.update();
        expect(r1.dateEnded).toBe(r1.endDate);

    });

    it('copies the medication', ()=>{

        var m1 = {id: 'addef970c6e9359a10210', status: 'active', dateWritten: 1469613466000, article: 'VICTOZA 6 mg/ml 2 3 ml Inj lös',instructions:undefined, posology: {morning: 2, midday: 1, evening: 1, night: 0}};


        var r1 = new MedicationOrder(Object.assign(m1));
        var r2 = r1.copy();

        expect(r1.instructions).toBe(r2.instructions);
        expect(r1.status).toBe(r2.status);
        expect(r1.dateEnded).toBe(r2.dateEnded);
        expect(r1.dateWritten).toBe(r2.dateWritten);
        expect(r1.dosage).toBe(r2.dosage);
        expect(r1.posology.toString).toBe(r2.posology.toString);

        r2.instructions = "abc";
        expect(r1.instructions).toBeFalsy(r2.instructions);


    });
});