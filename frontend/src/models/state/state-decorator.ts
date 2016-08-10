export function stateful(defaultValue: any){

    let sp = 'statefulProperties';

    return (target: Object, propertyKey: string) => {

        if (target[sp] == null){
            target[sp] = [];
        }

        target[sp].push(propertyKey);
        target[propertyKey] = defaultValue;

    }
}
