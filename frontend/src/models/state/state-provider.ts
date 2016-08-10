

export class StateProvider{

    private states: any = {};
    private properties = 'statefulProperties';

    private getOrSet(target: Object, isGetting: boolean = false){

        let prefix = target.constructor.name + "_";

        target[this.properties].map(property => {

            let key = prefix + property;

            (isGetting) ? target[property] = this.states[key] || target[property]  : this.states[key] = target[property];

        });

    }

    setState(target: Object){

        this.getOrSet(target,false);

    }

    getState(target: Object){

        this.getOrSet(target, true);

    }


}
