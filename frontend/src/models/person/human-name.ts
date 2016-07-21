export class HumanName{

    given: string;
    family: string;

    constructor(data: any){
        Object.assign(this, data);
    }
    
    get fullName(){

        return this.given + " " + this.family;
    }
}