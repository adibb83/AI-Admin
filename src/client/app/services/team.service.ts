import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HeadersService } from './headers.service';
import { WorkerModel, TagsModel } from "../models/worker.model";
import { apiUrl } from '../globals';
import { CompanyInfoService } from './companyInfo.service';

@Injectable()
export class TeamService implements OnDestroy {
    private url: string = apiUrl + 'api/Employees';
    private subscription: Subscription; 
    

    constructor(private _http: Http, private _headersService: HeadersService, private _companyInfoService: CompanyInfoService) { }

    load() {
        return this._http.get(`${this.url}`, this._headersService.get())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error || { Message: "Server error" }));
    }

    loadSingle():Observable<WorkerModel[]> {
        return  this._http.get(`${this.url}/company/${this._companyInfoService.get()}`, this._headersService.get())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error || { Message: "Server error" }));
    }

    create(worker: WorkerModel) {
        
        let method = (worker['Id'] ? 'put' : 'post');
        let url = (method === 'put' ? this.url + '/' + worker['Id'] : this.url);
       
        if (method === 'put') {
            return this._http.put(url, worker, this._headersService.get())
                .map((res: any) => res)
                .catch((error: any) => Observable.throw(error || { Message: "Server error" }));

        } else {
           
            return this._http.post(url, worker, this._headersService.get())
                .map((res: any) => res)
                .catch((error: any) => Observable.throw(error || { Message: "Server error" }));

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