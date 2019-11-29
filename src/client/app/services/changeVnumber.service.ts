import { Injectable, OnDestroy } from '@angular/core';
import { Http ,Headers, RequestOptions } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';
import { HeadersService } from './headers.service';
import { Compeny } from '../models/compeny.model'
import { apiUrl } from '../globals';
import { CompanyInfoService } from './companyInfo.service';
@Injectable()

export class ChangeVnumberService implements OnDestroy {
    private url: string = apiUrl + 'api/Companies';
    private subscription: Subscription;
    public data: any[];
    currentCompanyId: string;

    constructor(private _http: Http, private _headersService: HeadersService, private _cookieService: CookieService,private  _companyInfoService:CompanyInfoService) { }

    // getSelectingOptions(): Observable<any> {
    //     var url = this.url + '/numbers'
    //     return this._http.get(`${url}`, this._headersService.get())
    //         .map(res => res.json())
    //         .catch((error: any) => Observable.throw(JSON.stringify(error) || { Message: "Server error" }));
    // }



    // setNewNumber(number: string) {
    //     var url = this.url + '/' +this._companyInfoService.get()+ '/numbers';
    //     return this._http.put(url, JSON.stringify(number),this._headersService.get())
    //         .map((res: any) => res)
    //         .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    // }

    
    getSelectingOptions(): Observable<any> {
        var url = this.url + '/AvailableVirtualNumbers'
        return this._http.get(`${url}`, this._headersService.get())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(JSON.stringify(error) || { Message: "Server error" }));
    }



    setNewNumber(number: string) {
        var url = this.url + '/SetVirtualNumber';
        return this._http.put(url, JSON.stringify(number),this._headersService.get())
            .map((res: any) => res)
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }
}

