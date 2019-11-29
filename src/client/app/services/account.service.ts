import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AccountRegisterModel } from '../models/account-register.model';
import { AccountLoginModel } from '../models/account-login.model';
import { ForgotPasswordEmail } from '../models/account-forgotPasswordEmail.model';
import { ResetPasswordModle } from '../models/account-resetPassword.model'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { apiUrl } from '../globals';

@Injectable()
export class AccountService {
    private url: string = apiUrl;

    constructor(private _http: Http) { }

    confirm(userId: string, code: string): Observable<AccountRegisterModel[]> {

        let url: string = `${this.url}api/Account/ConfirmEmail?userId=${userId}&code=${code}`;
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers }); // Create a request option

        return this._http.get(url, options)
            .map(res => res)
            // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    register(body: Object): Observable<AccountRegisterModel[]> {

        let url: string = this.url + 'api/Account/Register';

        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers }); // Create a request option

        return this._http.post(url, body, options)
            .map(res => res)
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    login(obj: AccountLoginModel): Observable<AccountLoginModel[]> {
        let url: string = this.url + 'Token';

        let bodyString = `grant_type=password&username=${obj.Email}&password=${obj.Password}`;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers }); // Create a request option

        return this._http.post(url, bodyString, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));
    }

    sendForgotPasswordEmail(body: ForgotPasswordEmail): Observable<ForgotPasswordEmail[]> {

        let url: string = this.url + 'api/Account/SendForgotPasswordEmail';
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers }); // Create a request option

        return this._http.post(url, body, options)
            .map(res => res)
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));

    }

    resetPassword(body: ResetPasswordModle): Observable<ResetPasswordModle[]> {
        let url: string = this.url + 'api/Account/ResetPassword';
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers }); // Create a request option

        return this._http.post(url,body, options)
            .map(res => res)
            // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
            .catch((error: any) => Observable.throw(error.json() || { Message: "Server error" }));

    }

    checkIfAdmin(Token: RequestOptions) {
        let url: string =this.url+ 'api/Account/claims';
        return this._http.get(url, Token)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(JSON.stringify(error) || { Message: "Server error" }));
    }
}