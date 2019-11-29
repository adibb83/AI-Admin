import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { apiUrl } from '../globals';
import { CompanyInfoService } from './companyInfo.service';

@Injectable()

export class ContactService implements OnDestroy {
    private url: string = apiUrl + 'api/Account/Contact';
    private subscription: Subscription;
    public data: any[];
    constructor(private _http: Http, private _companyInfoService: CompanyInfoService) { }

    sendContact(conact:any) {
            return this._http.post(this.url, conact)
                .map((res: any) => res)
                .catch((error: any) => Observable.throw(error || { Message: "Server error" }));
    }


    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }
}