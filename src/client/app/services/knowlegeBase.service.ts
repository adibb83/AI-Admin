import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { KnowledgeModel, SubjectRequestModel } from "../models/knowledge.model";
import { KnowledgeTypeModel } from "../models/knowledgeType.model";
import { apiUrl } from '../globals';
import { HeadersService } from './headers.service';
import { CompanyInfoService } from './companyInfo.service';


@Injectable()
export class KnowlegeBaseService implements OnDestroy {
    private url: string = apiUrl + 'api/Subjects';
    private subscription: Subscription;


    constructor(private _http: Http, private _headersService: HeadersService, private _companyInfoService: CompanyInfoService) { }

    load() {
        return this._http.get(`${this.url}`, this._headersService.get())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    loadSingle(): Observable<KnowledgeModel[]> {
        return this._http.get(`${this.url}/company/${this._companyInfoService.get()}`, this._headersService.get())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    loadKnowledgeById(id: string): Observable<KnowledgeModel> {
        return this._http.get(`${this.url}/${id}`, this._headersService.get())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }


    create(knowledgeModel: KnowledgeModel) {

        console.log(knowledgeModel,this._headersService.get())
        let method = (knowledgeModel['Id'] ? 'put' : 'post');
        let url = (method === 'put' ? this.url + '/' + knowledgeModel['Id'] : this.url);
        // console.log(JSON.stringify(knowledgeModel) , method)
        if (method === 'put') {
            return this._http.put(url, knowledgeModel, this._headersService.get())
                .map((res: any) => res)
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
        } else {
            return this._http.post(url, knowledgeModel, this._headersService.get())
                .map((res: any) => res)
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
        }

    }

    changeTemplateKnowledgeIsEnabled(_knowledgeTypeModel: KnowledgeTypeModel) {
        console.log(_knowledgeTypeModel ,this._headersService.get())
        return this._http.post(`${this.url}/${_knowledgeTypeModel.Id}/enable`, _knowledgeTypeModel, this._headersService.get())
            .map((res: any) => res)
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    delete(id: string) {
        return this._http.delete(`${this.url}/${id}`, this._headersService.get())
            .map(res => res)
            .catch((error: any) => Observable.throw(error || { Message: "Server error" }));

    }

    loadKnowlegesIdAndNames(): Observable<KnowledgeTypeModel[]> {
        return this._http.get(`${this.url}/company/${this._companyInfoService.get()}/names`, this._headersService.get())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }
}