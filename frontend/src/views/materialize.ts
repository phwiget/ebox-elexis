declare var initMaterial;


export class Materialize{
    
    viewPort: number;
    
    attached() {

        initMaterial();
        this.viewPort = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    }

}