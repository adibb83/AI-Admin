import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HeadersService } from './headers.service';
import { CompanyInfoService } from './companyInfo.service'


@Injectable()
export class CallsService {
    public calllog: Object[];
    private url = 'http://voip.sensiya.com/api/over/getcalllogs';
    constructor(private _http: Http, private _headersService: HeadersService, private _companyInfoService: CompanyInfoService) { }

    load(body: any) {
        //  let body = {fromTime:'00',toTime:'00',companyId:this._companyInfoService.getCompanyId()}
        body.companyId = this._companyInfoService.getCompanyId();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this._http.post(this.url, '', {})
            .map((res: any) => res)
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    loadSingle(id: string) {
        return {
            Name: 'Lois Lane',
            TotalCallDurationInSeconds: 120,
            FrontDeskDurationInSeconds: 46,
            Classification: ['what'],
            Actions: [{ Value: 'Routing to Roy Tishler' }]//,
            // Messages: []
        }
    }

}