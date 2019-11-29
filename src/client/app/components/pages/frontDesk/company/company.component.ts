import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Observable, Subscription } from 'rxjs/Rx';
import { Compeny } from "../../../../models/compeny.model"
import { GlobalParamsService } from '../../../../services/globalParams.service';
import { CompanyInfoService } from '../../../../services/companyInfo.service';
import { MdDialog } from '@angular/material';
import { timeZones } from '../../../../globals';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms'



@Component({
    moduleId: module.id,
    styleUrls: ['./company.component.css'],
    templateUrl: './company.component.html'
})

export class CompanyComponent implements OnInit, OnDestroy {
    public companyObj: Compeny;
    private showLoader: boolean = false;
    public isChanges: boolean = false;
    private timeZones: any = timeZones;
    private lang: any;
    private tempLang: any = "English";
    private industries: any;
    private tempIndustry: string = "Real Estate";
    private selectedZone: string;
    public showSaveBanner: boolean = false;
    @ViewChild('companyEditForm') public companyEditForm: NgForm;

    constructor(
        private globalParamsService: GlobalParamsService,
        private _companyInfoService: CompanyInfoService,
        private _dialog: MdDialog,
        private _router: Router
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        //this._companyInfoService.getCompanyId()
        this.globalParamsService.Loader({ show: true, text: 'Loading' });
        this._companyInfoService.loadSingle().subscribe(res => {
          
            this.companyObj = res[0];
            this.industries = res[1];
            this.lang = res[2];
            this.globalParamsService.Loader({ show: false, text: '' });
        }
            ,
            error => {
                // Log errors if any
                console.log(error);
                this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) == "" ? 'Server Error Faild To Load Data.' : this.globalParamsService.handlErrors(error));
                this.globalParamsService.Loader({ show: false, text: '' });
            });
    }

    save(valid: boolean, value: any) {
        if (valid) {
            this.globalParamsService.Loader({ show: true, text: 'Saving' });
            this._companyInfoService.create(this.companyObj).subscribe((res: any) => {
                this.globalParamsService.showAlart(true, 'Data Saved');
                this.showSaveBanner = false;
                this.isChanges = false;
                this.globalParamsService.Loader({ show: false, text: '' });
            }
                ,
                (error: any) => {
                    console.log(error);
                    this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) == "" ? 'Server Error Faild To Save Data.' : this.globalParamsService.handlErrors(error));
                    this.globalParamsService.Loader({ show: false, text: '' });
                });
        }
    }

    redirectToChangeNumber() {
        this._router.navigate(['/pages/frontDesk', 'change-v-number']);
    }


    yesNoSaveChanges(event: boolean) {
     
        if (event) {
            if (!this.companyEditForm.valid) return;
            this.save(this.companyEditForm.valid, this.companyEditForm.value);
        }
        this.showSaveBanner = false;
        this.isChanges = false;
    }


     getYposition(): string {
        return document.getElementsByClassName('content-container')[1].scrollTop.toString() + 'px';
    }

    haveChanges() {
        this.isChanges = true;
    }

    ngOnDestroy() {
        this.globalParamsService.Loader({ show: false, text: '' });
        // if (this.isChanges) {
        //     this.openSaveDialog();
        // }
    }



}


 // openSaveDialog() {
    //     let dialogRef = this._dialog.open(YesNoDialog,
    //         {
    //             height: '200px',
    //             width: '400px',
    //         }
    //     );

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result != 'Cancel') {
    //             this.save();
    //         }
    //         else {
    //             this.isChanges = false;
    //         }
    //     });
    // }