
export class MedicationOrder{

    id: string;
    status: Array<string>;
    isHistory: boolean;
    isReserve: boolean;
    notes: string;
    dateWritten: number;
    dateEnded: number;
    reasonEnded: string;
    article: string;
    instructions: string;
    additionalInstructions: string;

    posology: any;
    hasPosology; boolean;
    showFreetext: boolean = false;
    hasBeenStopped: boolean = false;
    endDate: number;

    get dosage(): string{

        if (this.additionalInstructions == null && this.instructions != null){
            return this.instructions;
        } else if (this.additionalInstructions != null && this.instructions != null) {
            return this.instructions + ", " + this.additionalInstructions;
        } else return "";
    }

    constructor(data: any){

        Object.assign(this, data);
        this.extractPosology();
        
        (this.posology == null) ? this.hasPosology = false : this.hasPosology = true;

        this.showFreetext = !this.hasPosology;
        if (this.dateEnded != null) this.hasBeenStopped = true;
        this.endDate = this.dateEnded || new Date().getTime();

    }

    copy(): MedicationOrder{

        let m: MedicationOrder = new MedicationOrder(this);
        m.posology = Object.assign({}, this.posology);

        return m;

    }

    update(): void{

        if (!this.showFreetext) this.addInstructions();
        if (this.hasBeenStopped) this.dateEnded = this.endDate;

    }

    private extractPosology(): void{

        var pattern = /^([0-9.]{1,5})([-])([0-9.]{1,5})([-])([0-9.]{1,5})([-])([0-9.]{0,5})([0-9])$/;
        var str = pattern.exec(this.instructions);

        if (str !== null){

            this.posology = {};

            str[0].split("-").forEach((d,i) => {

                var dosage = parseFloat(d);
                switch(i){
                    case 0:
                        this.posology.morning = dosage;
                        break;
                    case 1:
                        this.posology.midday = dosage;
                        break;
                    case 2:
                        this.posology.evening = dosage;
                        break;
                    case 3:
                        this.posology.night = dosage;
                }

            });
        }

    }

    private addInstructions(): void{

        let keys = ["morning", "midday", "evening", "night"];
        var self = this;
        
        this.instructions = keys.map(function (key) {

            return (self.posology[key] == null) ? "0" : self.posology[key].toString();

        }).join("-");

    }
    
}