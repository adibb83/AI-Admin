import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { AccountService } from '../../../services/account.service';
import { AccountRegisterModel } from '../../../models/account-register.model';
import { GlobalParamsService } from '../../../services/globalParams.service';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'account-register.component.html',
    styleUrls: ['./account-register.component.css']

})
export class AccountRegisterComponent implements OnInit, OnDestroy {
    private error: any;
    private message: string;
    private showSyncAnimation: boolean = false;
    private subscription: Subscription;
    private currentSection = "#section1";
    private showError = false;
    private accountRegisterDetails: AccountRegisterModel = {
        "Email": null,
        "Password": null,
        "ConfirmPassword": null,
        "FullName": null,
        "PhoneNumber": null,
        "Company": null,
        "GreetingName": null,
        "RedirectUrl": location.origin + '/account/confirmation'
    };

    constructor(private _accountService: AccountService, private _globalParamsService: GlobalParamsService) {
    }

    register(): void {
        this.error = null;
        this._globalParamsService.Loader({ show: true, text: 'Registering' });
        console.log(this.accountRegisterDetails)
        this.subscription = this._accountService.register(this.accountRegisterDetails).subscribe(
            res => {
                this._globalParamsService.Loader({ show: true, text: 'Sent' });
                this.currentSection = '#section5';
                setTimeout(() => {
                    this._globalParamsService.Loader({ show: false, text: '' });
                }, 5000)
            },
            err => {
                console.log(err)
                this.error = this._globalParamsService.handlErrors(err);
                this._globalParamsService.Loader({ show: true, text: this.error });
                setTimeout(() => {
                    this._globalParamsService.Loader({ show: false, text: '' });
                }, 5000)
            });
    }

    isEmpty(str: string) {
        return (!str || 0 === str.length || !str.replace(/\s/g, '').length);
    }

    ngOnInit() {
        if (!this.isEmpty(this._globalParamsService.registerEmail)) {
            this.currentSection = "#section2";
            this.accountRegisterDetails.Email = this._globalParamsService.registerEmail;
        }
    }
    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe()
        
    }

    scroll(section: string, valid: boolean) {
        console.log(valid)
        if (valid) {
            this.showError = false;
            this.currentSection = section;
            if (section == '#section5') this.register();
        }
        else {
            this.showError = true;
        }

        // const element = document.querySelector(section);
        // if (element) element.scrollIntoView({ block: "start", behavior: "smooth" })
    }
}