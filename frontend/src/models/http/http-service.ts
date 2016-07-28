import {HttpClient,HttpResponseMessage} from 'aurelia-http-client';

export class HttpService{

    private client: HttpClient;
    private csrfHeader: string = "Csrf-Token";

    constructor(){

        this.client =  new HttpClient().configure(hc => {

            hc.withHeader('Content-Type', 'application/json');

        });

    }

    cookies(){
        return document.cookie;
    }

    csrfToken(){

        return this.cookies().replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1")

    }

    get(url: string): Promise<HttpResponseMessage> {

        return this.client.get(url).then(this.onSuccess, this.onFailure);

    }

    post(url: string, data: any): Promise<HttpResponseMessage> {

        return this.client.createRequest(url)
            .asPost()
            .withContent(data)
            .withHeader(this.csrfHeader, this.csrfToken())
            .send().then(this.onSuccess,this.onFailure)

    }

    put(url: string, data: any): Promise<HttpResponseMessage> {

        return this.client.createRequest(url)
            .asPut()
            .withContent(data)
            .withHeader(this.csrfHeader, this.csrfToken())
            .send().then(this.onSuccess,this.onFailure)

    }

    //JSON-wrapper for successful promise
    private onSuccess(r:HttpResponseMessage){
        r.response = JSON.parse(r.response);
        return Promise.resolve(r);
    }

    //JSON-wrapper for failed promise
    private onFailure(r:HttpResponseMessage){
        r.response = JSON.parse(r.response);
        return Promise.reject(r);
    }

}
