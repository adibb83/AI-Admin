import { Component, OnInit, OnDestroy } from "@angular/core";
import { GlobalParamsService } from '../../../services/globalParams.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CompanyInfoService } from '../../../services/companyInfo.service';
import { AuthTokenService } from '../../../services/auth-token.service';

@Component({
    moduleId: module.id,
    styleUrls: ['./admin.component.css'],
    templateUrl: './admin.component.html',
})


export class AdminComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    private companies: any = [];
    constructor(private _globalParamsService: GlobalParamsService, private _authTokenService: AuthTokenService, private _companyInfoService: CompanyInfoService, private _router: Router) { }

    selectCompany(company: any, index: number) {
        this._authTokenService.putAuthTokenToCookie(company.DeveloperToken);
        this._companyInfoService.setCurrentCompanyId(company.Id);
        this._router.navigate(['/pages/frontDesk']);
    }

    ngOnInit() {
        this._globalParamsService.Loader({ show: true, text: 'Loading' });
        this._companyInfoService.getAllAdminCompanies().subscribe((res: any) => {
            this.companies = res.filter((item: any) => item.DeveloperToken);
            this._globalParamsService.Loader({ show: false, text: '' });
        }
            ,
            (err: any) => {
                console.log(err);
                this._globalParamsService.Loader({ show: false, text: '' });
            }
        );
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }


    customTrackBy(index: number, obj: any): any {
        return index;
    }

}
