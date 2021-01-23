import { Response } from 'express';
import * as request from "request-promise-native";
import { cinfo } from 'simple-color-print';

export class HttpService { 

    public get(url: string, options?:any) {
        return request.get(url, options || null);
    }

    public post(url: string, body?: any, options?: any) {
        return request.post(url, options || null); 
    }

    public put(url: string, body:any, options?: any) {
        return request.put(url, options || null);
    }

    public delete(url: string, body:any, options?:any) {
        return request.delete(url, options || null);
    }
}

export default HttpService;