import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, animate, trigger, state, style, transition } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/core';
import { AuthTokenService } from '../../services/auth-token.service';
import { CompanyInfoService } from '../../services/companyInfo.service';
import { GlobalParamsService } from '../../services/globalParams.service';
import { LoaderModel } from '../../models/loader.model'
 

@Component({
    moduleId: module.id,
    selector: 'pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css'],
    animations: [
        trigger('slideInOut', [
            state('in', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('out', style({
                transform: 'translate3d(-100%, 0, 0)'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
    ]
})

export class PagesComponent implements OnInit, OnDestroy, AfterViewInit {
    id: string;
    messageObject: any;
    messageSubscription: Subscription;
    loaderObj: LoaderModel;
    loaderSubscription: Subscription;
    showAllNavChildren: boolean = true;
    constructor(private _authTokenService: AuthTokenService,
        private _router: Router,
        private _cookieService: CookieService,
        private _companyInfoService: CompanyInfoService,
        private globalParamsService: GlobalParamsService) {

    }

    menuState: string = 'in';

    toggleMenu() {
        // 1-line if statement that toggles the value:
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }

    getCompanyId() {
        return this._cookieService.get('company-id');
    }



    ngOnInit() {
        this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
        this.messageSubscription = this.globalParamsService.showMessage$.subscribe(item => this.messageObject = item);
        this.loaderSubscription = this.globalParamsService.showLoader$.subscribe(item => this.loaderObj = item);
        
    }
    

    ngAfterViewInit() {
        this._router.events.subscribe(event => {
            if (event.url == '/pages/admin' || event.url == '/pages/admin#top') {
                this.showAllNavChildren = false;
            }
            else {
                this.showAllNavChildren = true;
            }
        });
    }

    logout() {
        this._authTokenService.removeAuthTokenFromCookie();
        this._authTokenService.removeIsAdminFromCookie();
        this._authTokenService.removeAdminTokenFromCookie();
        this._cookieService.remove('company-id');
        const currentUrl = this._router.url.toLowerCase();
        const restrictedUrls: string[] = ['/pages/admin', '/pages/forms', '/pages/workers', '/pages/knowledge',  '/pages/frontDesk'];
        const isOnRestricted = restrictedUrls.find(url => currentUrl.includes(url.toLowerCase()));
        if (isOnRestricted) this._router.navigate(['/']);
    }



    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
        this.loaderSubscription.unsubscribe();
    }
}
