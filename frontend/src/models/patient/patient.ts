import {HumanName} from "../person/human-name";

export class Patient{
    
    id: string;
    identifier: Array<string>;
    name: HumanName;
    gender: string;

    constructor(data: any){
        Object.assign(this, data);
        this.name = new HumanName(data.name);
    }

    get number(){
        return this.identifier[0];
    }

}