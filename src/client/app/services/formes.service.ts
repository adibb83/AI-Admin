import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { FormModel } from "../models/form.model"

import 'rxjs/add/operator/map';

import { HeadersService } from './headers.service';
import { CompanyInfoService } from './companyInfo.service';
import { apiUrl } from '../globals';
@Injectable()
export class FormesService implements OnDestroy {
    private url: string = apiUrl + 'api/forms';
    private subscription: Subscription;
    public data: any[];
    public dataWithSystem: any[];

    constructor(private _http: Http, private _headersService: HeadersService, private _companyInfoService: CompanyInfoService) { }

    load() {
        return this._http.get(`${this.url}`, this._headersService.get())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    loadSingle() {
        return this._http.get(`${this.url}/company/${this._companyInfoService.get()}`, this._headersService.get())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    create(formModel: FormModel) {
        let method = (formModel['id'] ? 'put' : 'post');
        let url = (method === 'put' ? this.url + '/' + formModel['id'] : this.url);

        if (method === 'put') {
            return this._http.put(url, formModel, this._headersService.get())
                .map((res: any) => res)
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));

        }
        else{
            return this._http.post(url, formModel, this._headersService.get())
                .map((res: any) => res)
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
        }

    }

    delete(id: string) {
        return this._http.delete(`${this.url}/${id}`, this._headersService.get())
            .map(res => res)
            .catch((error: any) => Observable.throw(error || { Message: "Server error" }));

    }


    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }
}