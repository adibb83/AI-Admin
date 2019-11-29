import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { AccountService } from '../../services/account.service';
//import { PerfectScrollbarComponent } from 'angular2-perfect-scrollbar';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { GlobalParamsService } from '../../services/globalParams.service';
import { LoaderModel } from '../../models/loader.model'

@Component({
    moduleId: module.id,
    selector: 'account',
    providers: [AccountService],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit, OnDestroy, AfterViewInit {
    loaderObj: LoaderModel;
    loaderSubscription: Subscription;
    showLoginButton: boolean = true;
    showSignUpButton: boolean = true;

    constructor(private globalParamsService: GlobalParamsService, private _router: Router) {
    }

    ngOnInit() {

        this.loaderSubscription = this.globalParamsService.showLoader$.subscribe(item => this.loaderObj = item);
    }

    ngAfterViewInit() {
        this._router.events.subscribe(event => {
            //this.removeHomeBackImg(event.url);
            if (event instanceof NavigationEnd) {
                document.getElementById('scroller').scrollTop = 0;
            }
            this.addRemoveSignUpButton(event.url);
            this.addRemoveLoginButton(event.url)
        });
    }

    addRemoveSignUpButton(url: string) {
        if (url == '/account/register') {
            this.showSignUpButton = false;
        }
        else {
            this.showSignUpButton = true;
        }
    }

    addRemoveLoginButton(url: string) {
        if (url == '/account/login') {
            this.showLoginButton = false;
        }
        else {
            this.showLoginButton = true;
        }
    }

    // removeHomeBackImg(url: string) {
    //     console.log(url);
    //     if (url == '/account/home' || url == '/') {
    //         document.getElementById('account').classList.remove('publicBackImg');
    //     }
    //     else {
    //         document.getElementById('account').classList.add('publicBackImg');
    //     }

    // }

    ngOnDestroy() {
        this.loaderSubscription.unsubscribe();
    }
}
