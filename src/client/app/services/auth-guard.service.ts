import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthTokenService } from './auth-token.service';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authTokenService: AuthTokenService,
        private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this._authTokenService.getAuthTokenFromCookie())
            return true;
        this._router.navigate(['/account', 'login']);
        return false
    }
}
