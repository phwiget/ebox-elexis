
import {FilterValueConverter} from "../../../../src/views/common/converters/filter";


describe('the filter value converter', () => {

    var converter: FilterValueConverter;

    beforeEach(() => {

        converter = new FilterValueConverter();

    });

    it('all items to be displayed', () => {

        var item1 = {"name": "test", "address": {"street": "Hauptstrasse"}};
        var item2 = {"name": "fake", "address": {"street": "Amselweg"}};
        var item3 = {"name": "system", "address": {"street": "Finkenweg"}};
        var item4 = { "address": {"street": "Drosselweg"}};
        var item5 = {"name": "else", "array":["bird", "horse", "cat", "dog"]};

        var items = [{"id":"addef970c6e9359a10210","identifier":["addef970c6e9359a10210"],"dateWritten":1469613466000,"medicationCodeableConcept":{"codings":[{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"A10BX07"}],"text":"VICTOZA 6 mg/ml 2 3 ml Inj lös"},"dosageInstructions":[{"text":"2-1-1-0"}]},{"id":"Cf45de2f4d30e500d032","identifier":["Cf45de2f4d30e500d032"],"dateWritten":1469695257000,"medicationCodeableConcept":{"codings":[{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"M01AB05"}],"text":"DICLOFENAC actavis 25 mg Filmtabl"},"dosageInstructions":[{"text":"1-0-1-1"}]},{"id":"Dbffca2007fbdbda0081","identifier":["Dbffca2007fbdbda0081"],"dateWritten":1469613022000,"dateEnded":1469613022000,"note":"Vor dem Essen","medicationCodeableConcept":{"codings":[{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"J01FA09"}],"text":"KLACID 250 mg Filmtabl"},"dosageInstructions":[]},{"id":"f89bf3a9bc37460a40113","identifier":["f89bf3a9bc37460a40113"],"dateWritten":1469613081000,"dateEnded":1469613081000,"medicationCodeableConcept":{"codings":[{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"B03AC"}],"text":"FERINJECT 1000 mg/20ml 20 ml Inj lös"},"dosageInstructions":[]},{"id":"La2f5e3814c63d0b40148","identifier":["La2f5e3814c63d0b40148"],"dateWritten":1469613186000,"note":"Vor dem Essen","medicationCodeableConcept":{"codings":[{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"J01FA09"}],"text":"KLACID 250 mg Filmtabl"},"dosageInstructions":[{"text":"1-0-1-0"}]},{"id":"Mcb7daad132dc64d70144","identifier":["Mcb7daad132dc64d70144"],"dateWritten":1469613165000,"medicationCodeableConcept":{"codings":[{"system":"urn:oid:1.3.160‎","code":"7680454950354"},{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"A10AC01"}],"text":"INSULIN Insulatard HM Amp 10 ml"},"dosageInstructions":[]},{"id":"md3bd3598895ed385025","identifier":["md3bd3598895ed385025"],"dateWritten":1469695248000,"dateEnded":1469695248000,"medicationCodeableConcept":{"codings":[{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"M01AB05"}],"text":"DICLOFENAC actavis 25 mg Filmtabl"},"dosageInstructions":[]},{"id":"n947d2e9aaf00442f0124","identifier":["n947d2e9aaf00442f0124"],"dateWritten":1469613096000,"dateEnded":1469613096000,"medicationCodeableConcept":{"codings":[{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"A10BX07"}],"text":"VICTOZA 6 mg/ml 2 3 ml Inj lös"},"dosageInstructions":[]},{"id":"t73274361106502a60204","identifier":["t73274361106502a60204"],"dateWritten":1469613426000,"dateEnded":1469613426000,"medicationCodeableConcept":{"codings":[{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"A10BX07"}],"text":"VICTOZA 6 mg/ml 2 3 ml Inj lös"},"dosageInstructions":[{"text":"2-0-1-0"}]},{"id":"Tc7f8cc7ac27557980136","identifier":["Tc7f8cc7ac27557980136"],"dateWritten":1469613156000,"dateEnded":1469613156000,"medicationCodeableConcept":{"codings":[{"system":"urn:oid:1.3.160‎","code":"7680454950354"},{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"A10AC01"}],"text":"INSULIN Insulatard HM Amp 10 ml"},"dosageInstructions":[]},{"id":"u7a568eaa3253e64c0156","identifier":["u7a568eaa3253e64c0156"],"dateWritten":1469613201000,"dateEnded":1469613201000,"medicationCodeableConcept":{"codings":[{"system":"urn:oid:2.16.840.1.113883.6.73‎","code":"B03AC"}],"text":"FERINJECT 1000 mg/20ml 20 ml Inj lös"},"dosageInstructions":[{"text":"1-1-1-0.5"}]}];

        var result = converter.toView([item1,item2,item3,item4,item5],"fake");
        expect(result.length).toBe(1);
        expect(result[0]).toBe(item2);

        var result = converter.toView([item1,item2,item3,item4,item5],"Drosselweg");
        expect(result.length).toBe(1);
        expect(result[0]).toBe(item4);

        var result = converter.toView([item1,item2,item3,item4,item5],"cat");
        expect(result.length).toBe(1);
        expect(result[0]).toBe(item5);

        var result = converter.toView(items,"Victoza");
        expect(result.length).toBe(3);
    });


});