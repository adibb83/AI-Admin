import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/core';
import { AccountService } from '../../../services/account.service';
import { AccountLoginModel } from '../../../models/account-login.model';
import { ForgotPasswordEmail } from '../../../models/account-forgotPasswordEmail.model';
import { AuthTokenService } from '../../../services/auth-token.service';
import { AccountTokenModel } from '../../../models/account-token.model';
import { CompanyInfoService } from '../../../services/companyInfo.service';
import { DialogForgotPassword } from './dialog-forgotPassword/dialog-forgotPassword.component'
import { MdDialog } from '@angular/material';
import { GlobalParamsService } from '../../../services/globalParams.service';
import { HeadersService } from '../../../services/headers.service';


@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'account-login.component.html',
    styleUrls: ['./account-login.component.css']

})
export class AccountLoginComponent implements OnDestroy {
    private error: any;
    selectedOption: string;

    private subscription: Subscription;
    private accountLoginCredentials: AccountLoginModel = {
        "Email": null,
        "Password": null
    };

    private accountForgotPassCredentils: ForgotPasswordEmail = {
        "Email": null,
        "RedirectUrl": location.origin + '/account/forgotPasswordConfirmation'
    };


    constructor(
        private _accountService: AccountService,
        private _headersService: HeadersService,
        private _cookieService: CookieService,
        private _router: Router,
        private _authTokenService: AuthTokenService,
        private _globalParamsService: GlobalParamsService,
        public _companyInfoService: CompanyInfoService,

        public dialog: MdDialog) { }


    login(valid: boolean, value: any) {

        if(valid){
        this._globalParamsService.Loader({show:true, text:'Connecting'});
        this.error = null;
        this._authTokenService.removeAuthTokenFromCookie();
        this._authTokenService.removeIsAdminFromCookie();
        this._authTokenService.removeAdminTokenFromCookie();
        this._cookieService.remove('company-id');
        this.subscription = this._accountService.login(this.accountLoginCredentials).subscribe(
            (res: any) => {
                // set login token
                const str: string = res['token_type'] + ' ' + res['access_token'];
                this._authTokenService.putAuthTokenToCookie(str);


                //  //Check if user is administrator
                this.subscription = this._accountService.checkIfAdmin(this._headersService.get()).subscribe((res: any) => {
                    let isAdminObj = res.filter((obj: any) => obj.ClaimValue === "Administrator")
                    if (isAdminObj && isAdminObj.length > 0) {
                        this._authTokenService.putIsAdminToCookie("Administrator");
                        this._authTokenService.putAdminTokenToCookie(str);
                        this._router.navigate(['/pages/admin']);
                        this._globalParamsService.Loader({show:false, text:''});
                    }
                    else {
                        //if user is not administrator get his company Id   
                        this.getUserCompanyId();
                        this._globalParamsService.Loader({show:false, text:''});
                    }
                },
                    (err: any) => {
                        console.log(err)
                        this.getUserCompanyId();
                    }
                );
            },
            err => {
                console.log(err)
                this.error = err;
                this._globalParamsService.Loader({show:false, text:''});
            });
        }
    }

    getUserCompanyId() {
        this.subscription = this._companyInfoService.getCompanyId().subscribe((res: any) => {
            this._companyInfoService.setCurrentCompanyId(res[0].Id);
            setTimeout(() => {
                this._router.navigate(['/pages/frontDesk/company']);
                this._globalParamsService.Loader({show:false, text:''});
            }, 500);
        },
            (err: any) => {
                console.log(err)
                if (err.error_description) {
                    this.error = err.error_description;
                }
                else {
                    this.error = 'server error';
                }
                this._globalParamsService.Loader({show:false, text:''});
            }
        );
    }

    sendForgotPassEmail() {
        this._globalParamsService.Loader({show:true, text:'Sending'});
        this.error = 'conformation e-mail sent to: ' + this.accountForgotPassCredentils['Email'];
        this.subscription = this._accountService.sendForgotPasswordEmail(this.accountForgotPassCredentils).subscribe(
            (res: any) => {
                this._globalParamsService.Loader({show:false, text:''});
            },
            err => {
                console.log(err)
                this._globalParamsService.Loader({show:false, text:''});
                this.error = err;
            });
    }

    ngOnDestroy() {
        this._globalParamsService.Loader({show:false, text:''});
        if (this.subscription) this.subscription.unsubscribe()
    }
}




    // openDialog() {
    //     let dialogRef = this.dialog.open(DialogForgotPassword,
    //         {
    //             height: '300px',
    //             width: '400px'
    //         }
    //     );

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result && result != 'Cancel') {
    //             this._globalParamsService.Loader(true);
    //             this.accountForgotPassCredentils['Email'] = result;
    //             this.sendForgotPassEmail()
    //             this._globalParamsService.Loader({show:false, text:''});
    //         }

    //     });
    // }


 // this.error = null;
        // this.subscription = this._accountService.login(this.accountLoginCredentials).subscribe(
        //     (res: any) => {
        //         const str: string = res['token_type'] + ' ' + res['access_token'];
        //         this._authTokenService.putAuthTokenToCookie(str);


        //         this.subscription = this._companyInfoService.getCompanyId().subscribe((res: any) => {
        //             console.log(res)
        //             this._companyInfoService.setCurrentCompanyId(res[0].Id);
        //             setTimeout(() => {
        //                 this._router.navigate(['/pages/company']);
        //                  this._globalParamsService.Loader(false);
        //             }, 2000);
        //         },
        //             (err: any) => {
        //                 console.log(err)
        //                 if (err.error_description) {
        //                     this.error = err.error_description;
        //                 }
        //                 else {
        //                     this.error = 'server error';
        //                 }
        //                  this._globalParamsService.Loader(false);
        //             }
        //         );
        //     },
        //     err => {
        //         console.log(err)
        //         if (err.error_description) {
        //             this.error = err.error_description;
        //         }
        //         else {
        //             this.error = 'server error';
        //         }
        //          this._globalParamsService.Loader(false);
        //     });