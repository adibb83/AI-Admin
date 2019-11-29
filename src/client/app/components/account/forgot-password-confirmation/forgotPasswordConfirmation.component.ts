import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ResetPasswordModle } from '../../../models/account-resetPassword.model'
import { AccountService } from '../../../services/account.service';
import { GlobalParamsService } from '../../../services/globalParams.service';

@Component({
    moduleId: module.id,
    selector: 'forgotPasswordConfirmation',
    templateUrl: 'forgotPasswordConfirmation.component.html',
    styleUrls: ['./forgotPasswordConfirmation.component.css']
})

export class ForgotPasswordConfirmation implements OnInit, OnDestroy {
    private error: any;
    private message: any;
    private subscription: Subscription;
    private showSyncAnimation: boolean = false;
    private isValidCode: boolean = true;
    private resetPasswordCredentils: ResetPasswordModle =
    {
        "Code": null,
        "UserId": null,
        "NewPassword": '',
        "ConfirmPassword": ''
    };

    constructor(private _accountService: AccountService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute, private _globalParamsService:GlobalParamsService) { }

    reset(valid: boolean, value: any) {
        if(!valid) return;
        this._globalParamsService.Loader({show:true,text:"Resetting"});
        this.error = null;
        this.subscription = this._accountService.resetPassword(this.resetPasswordCredentils).subscribe(
            res => {
                console.log(res)
                this.message = "we have successfully changed your password redirecting to login page";
                setTimeout(() => {
                    this._globalParamsService.Loader({show:false,text:""});
                    this._router.navigate(['/account/login']);
                }, 4000);

            },
            err => {
                console.log(err)
                this.error = err;
                this._globalParamsService.Loader({show:false,text:""});
            });
    }

    ngOnInit() {

        this._globalParamsService.Loader({show:true,text:"Loading"});
        const qp = this._activatedRoute.snapshot.queryParams;

        if (decodeURIComponent(qp['userId']) && decodeURIComponent(qp['code'])) {

            this.resetPasswordCredentils['Code'] = decodeURIComponent(qp['code']);
            this.resetPasswordCredentils['UserId'] = decodeURIComponent(qp['userId']);
            this._globalParamsService.Loader({show:false,text:""});
        }
        else {
            this.isValidCode = false;
            this.error = {error_description:'your verification code is not valid please try changeing your password again'};
            this._globalParamsService.Loader({show:false,text:""});
            setTimeout(() => {
                this._router.navigate(['/account/login']);
            }, 4000);
        }

    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe()
    }

}
