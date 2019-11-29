import { Component } from '@angular/core';
import { GlobalParamsService } from '../../../services/globalParams.service';
import { AccountService } from '../../../services/account.service';
import { ForgotPasswordEmail } from '../../../models/account-forgotPasswordEmail.model';
import { Subscription } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'forgot-password-email',
    templateUrl: 'forgot-password-email.component.html',
    styleUrls: ['./forgot-password-email.component.css']
})

export class ForgotPasswordEmailComponent {
    private accountForgotPassCredentils: ForgotPasswordEmail = {
        "Email": null,
        "RedirectUrl": location.origin + '/account/forgotPasswordConfirmation'
    };
    private subscription: Subscription;
    private error: any;
    private success: any;
    constructor(
        private _accountService: AccountService,
        private _globalParamsService: GlobalParamsService,


    ) { }

    sendForgotPassEmail(valid:boolean ,value: any) {
        if(valid){
        this._globalParamsService.Loader({show:true,text:"Sending"});
        this.subscription = this._accountService.sendForgotPasswordEmail(this.accountForgotPassCredentils).subscribe(
            (res: any) => {
                this._globalParamsService.Loader({show:false,text:""});
                this.success = 'Confirmation e-mail sent to: ' + this.accountForgotPassCredentils['Email'];

            },
            err => {
                console.log(err)
                this._globalParamsService.Loader({show:true,text:""});
                this.error = err;
            });
    }
    }
}