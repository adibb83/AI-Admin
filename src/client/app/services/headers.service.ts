import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { AuthTokenService } from './auth-token.service';
import { Router } from '@angular/router';

@Injectable()
export class HeadersService {
    constructor(private _router: Router, private _authTokenService: AuthTokenService) { }

    get(): RequestOptions {
        let headers: any;
        const currentUrl = this._router.url.toLowerCase();
        const restrictedUrls: string[] = ['/pages/admin','/pages/workers','/pages/knowledge','/pages/frontDesk'];
        const isOnPages = restrictedUrls.find(url => currentUrl.includes(url.toLowerCase()));
        if (this._authTokenService.getAdminTokenFromCookie() && isOnPages) {
            headers = new Headers({
                'api-key': this._authTokenService.getAuthTokenFromCookie(), 'Content-Type': 'application/json',
            });
        }
        else {
            headers = new Headers({
                Authorization: this._authTokenService.getAuthTokenFromCookie(), 'Content-Type': 'application/json',
            });
        }
        return new RequestOptions({ headers });
    }

    getAdminToken(): RequestOptions {
        let headers = new Headers({
            Authorization: this._authTokenService.getAdminTokenFromCookie(), 'Content-Type': 'application/json'
        });

        // if (ContentType) headers['Content-Type'] = ContentType;

        return new RequestOptions({ headers });
    }
}


