import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConfiguration} from "../../swagger/api-configuration";


@Injectable({
    providedIn: 'root'
})
export class ApiProvider
{
    private url: string;


    constructor(
        public http: HttpClient,
        protected config: ApiConfiguration
    )
    {
        this.url = this.config.rootUrl;
    }

    get(endpoint: string, params?: any, options: any = {})
    {

        if (!options)
        {
            options = {};
        }
        if (params)
        {
            options.params = params;
        }
        return this.http.get(this.url + '/' + endpoint, options);
    }

    post(endpoint: string, body?: any, options?: any)
    {
        return this.http.post(this.url + '/' + endpoint, body, options);
    }

    form(endpoint: string, params: any, options: any = {})
    {
        options.headers = new HttpHeaders().set("Content-Type", 'application/x-www-form-urlencoded');
        let p = new URLSearchParams();

        for (let k in params)
        {
            p.set(k, params[k]);
        }
        return this.http.post(this.url + '/' + endpoint, p.toString(), options);
    }

    put(endpoint: string, body: any, options?: any)
    {
        return this.http.put(this.url + '/' + endpoint, body, options);
    }

    delete(endpoint: string, options?: any)
    {
        return this.http.delete(this.url + '/' + endpoint, options);
    }

    patch(endpoint: string, body: any, options?: any, url = this.url)
    {
        return this.http.put(url + '/' + endpoint, body, options);
    }

    public getUrl()
    {
        return this.url;
    }

    public getEndpoint(url: string, params: string[] = null)
    {
        let opt = null;
        if (params)
        {
            opt = '?';
            for (let key in params)
            {
                opt += key + "=" + params[key] + "&";
            }
        }
        return this.getUrl() + '/' + url + (opt === null ? '' : opt)
    }

}
