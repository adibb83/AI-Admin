import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeVnumberService } from '../../../../services/changeVnumber.service';
import { GlobalParamsService } from '../../../../services/globalParams.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'change-v-number-dialog',
    styleUrls: ['./change-v-number-dialog.component.css'],
    templateUrl: 'change-v-number-dialog.component.html',
    providers: [ChangeVnumberService]

})

export class ChangeVNumberDialog implements OnInit, OnDestroy {

    private noNumbersMessage: boolean = false;
    private selectingOptions: any;
    private numbers: any;
    private states: any;
    private cities: any;
    private selectedNumber: string;
    private selectedCountry = 'AZ';
    private selectedState = 'AZ';
    private selectedCity = 'AZ';

    checked = false;

    constructor(private _globalParamsService: GlobalParamsService, private _router: Router, private _changeVnumberService: ChangeVnumberService) { }

    countrySelected(event: any) {
        this.states = null;
        this.cities = null;
        this.numbers = null;
        this.selectedNumber = null;
        if (this.selectingOptions[event].States && this.selectingOptions[event].States.length > 0) {
            this.states = this.selectingOptions[event].States;
        }
        else {
            this.cities = this.selectingOptions[event].Cities
        }

    }

    stateSelected(event: any) {
        this.cities = null;
        this.numbers = null;
        this.selectedNumber = null;
        this.cities = this.states[event].Cities;
    }

    citySelected(event: any) {
        this.numbers = null;
        this.selectedNumber = null;
        this.numbers = this.cities[event].PhoneNumbers;
    }

    ngOnInit() {
        this._globalParamsService.Loader({show:true,text:'Loading'})
        this._changeVnumberService.getSelectingOptions().subscribe(res => {
            this.selectingOptions = res;
            if (!this.selectingOptions) {
                this.noNumbersMessage = true;
            }
            this._globalParamsService.Loader({show:false,text:''})
        }
            ,
            error => {
                // Log errors if any
                console.log(error);
                this._globalParamsService.Loader({show:false,text:''})
                this._globalParamsService.showAlart(true, this._globalParamsService.handlErrors(error) == "" ? 'Server-Error ,The file is not saved' : this._globalParamsService.handlErrors(error));

            });
    }

    ngOnDestroy() {
        this._globalParamsService.Loader({show:false,text:''});
    }

    setNewNumber() {
        this._globalParamsService.Loader({show:true,text:'Saving'})
        this._changeVnumberService.setNewNumber(this.selectedNumber).subscribe(res => {
            this._globalParamsService.Loader({show:false,text:''})
            this._globalParamsService.showAlart(true, 'new virtual number '+this.selectedNumber+' saved successfully');

            this._router.navigate(['/pages/frontDesk', 'company']);
        }
            ,
            error => {
                // Log errors if any
                console.log(error);
                this._globalParamsService.showAlart(true, this._globalParamsService.handlErrors(error) == "" ? 'Server-Error ,The file is not saved' : this._globalParamsService.handlErrors(error));
                this._globalParamsService.Loader({show:false,text:''})
            });
    }

    returnToFrontDesk() {
        this._router.navigate(['/pages/frontDesk', 'company']);
    }
}