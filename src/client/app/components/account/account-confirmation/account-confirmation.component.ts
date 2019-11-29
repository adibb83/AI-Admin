import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AccountService } from '../../../services/account.service';

@Component({
    moduleId: module.id,
    selector: 'confirmation',
    templateUrl: 'account-confirmation.component.html'
})

export class AccountConfirmationComponent implements OnInit, OnDestroy {
    private error: Object;
    private success: string;
    private subscription: Subscription;

    constructor(private _accountService: AccountService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) { }

    onSuccess() {
        this.success = 'You have successfully confirmed your email';
    }

    confirm(userId: string, code: string) {

        this.error = null;

        this.subscription = this._accountService.confirm(userId, code).subscribe(
            res => {
                this.onSuccess();
            },
            err => {
                console.log(err)
                this.error = err;
            });
    }

    ngOnInit() {
        const qp = this._activatedRoute.snapshot.queryParams;
        this.confirm(
            encodeURIComponent(qp['userId']),
            encodeURIComponent(qp['code'])
        );
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe()
    }

}
