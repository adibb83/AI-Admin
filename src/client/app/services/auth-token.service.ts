import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthTokenService {
    authToken: string | null;
    adminToken: string | null;
    isAdmin:string | null;

    constructor(private _cookieService: CookieService) { }

    headers(Authorization: string) {
        let headers = new Headers({
            Authorization:this.getAuthTokenFromCookie(),
            'Accept': 'application/json'
        });
        return new RequestOptions({ headers });
    }

    putAuthTokenToCookie(authToken: string) {
        this.authToken = authToken;
        this._cookieService.put('auth-token', authToken);
    }

    getAuthTokenFromCookie() {
        if (!this.authToken) this.authToken = this._cookieService.get('auth-token');
        return this.authToken;
    }

    removeAuthTokenFromCookie() {
        this.authToken = null;
        this._cookieService.remove('auth-token');
    }

     putIsAdminToCookie(admin: string) {
        this.isAdmin = admin;
        this._cookieService.put('isAdmin', admin);
    }

    getIsAdminFromCookie() {
        if (!this.isAdmin)this.isAdmin = this._cookieService.get('isAdmin');
        return this.isAdmin;
    }

    removeIsAdminFromCookie() {
        this.isAdmin = null;
        this._cookieService.remove('isAdmin');
    }

    putAdminTokenToCookie(admin: string) {
        this.adminToken = admin;
        this._cookieService.put('adminToken', admin);
    }

    getAdminTokenFromCookie() {
        if (!this.adminToken)this.adminToken = this._cookieService.get('adminToken');
        return this.adminToken;
    }

    removeAdminTokenFromCookie() {
        this.adminToken = null;
        this._cookieService.remove('adminToken');
    }
}

