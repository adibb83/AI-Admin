import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';
import { HeadersService } from './headers.service';
import { Compeny } from '../models/compeny.model'
import { apiUrl } from '../globals';


@Injectable()
export class CompanyInfoService implements OnDestroy {
    private url: string = apiUrl + 'api/Companies';
    private subscription: Subscription;
    public data: any[];
    currentCompanyId: string;



    constructor(private _http: Http, private _headersService: HeadersService, private _cookieService: CookieService) { }

    setCurrentCompanyId(id: any = null) {
        this._cookieService.put('company-id', id);
        this.currentCompanyId = id;
    }


    get(): string {
        let id: string = this._cookieService.get('company-id');
        return id;
    }

    load() {
        this.data = null;

        let observable: Observable<any> = Observable.forkJoin(
            this._http.get(`${this.url}`, this._headersService.get()).map(res => res.json())
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }))
            , this._http.get(`${this.url}`, this._headersService.get()).map(res => res.json())
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }))
        );

        this.subscription = observable.subscribe(res => {
            this.data = res;
        });
    }

    getCompanyId() {
        return this._http.get(`${this.url}`, this._headersService.get()).map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    loadSingle() {
        return Observable.forkJoin(this._http.get(`${this.url}/${this.get()}`, this._headersService.get()).map(res => res.json())
            .catch((error: any) => Observable.throw(JSON.stringify(error) || { Message: "Server error" })),
            this._http.get(`${this.url}/industries`, this._headersService.get()).map(res => res.json())
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" })),
            this._http.get(`${this.url}/languages`, this._headersService.get()).map(res => res.json())
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }))

        );
    }

    create(companyDetails: Compeny) {

        let method: string = (companyDetails['Id'] ? 'put' : 'post');
        let url = (method === 'put' ? this.url + '/' + companyDetails['Id'] : this.url);

        if (method === 'put') {
            return this._http.put(url, companyDetails, this._headersService.get())
                .map((res: any) => res)
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
        }
        else {
            return this._http.post(url, companyDetails, this._headersService.get())
                .map((res: any) => res)
                .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
        }

    }


    getAllAdminCompanies() {

        return this._http.get(`${this.url}/all`, this._headersService.getAdminToken())
            .map(res => res.json())
            .catch((error: any) => Observable.throw(JSON.stringify(error) || { Message: "Server error" }));
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }
}