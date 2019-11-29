import { Component, OnInit } from "@angular/core";
import { GlobalParamsService } from '../../../../services/globalParams.service';
import { ContactService } from '../../../../services/home-contact.service';
import { ContactModel } from '../../../../models/contact.model';

interface Register {
    Email: string;
    FullName: string;
    PhoneNumber: string;
    Company: string;

}

@Component({
    moduleId: module.id,
    selector: 'pricing',
    styleUrls: ['./pricing.component.css'],
    templateUrl: './pricing.component.html',
    providers: [ContactService]
})


export class PricingComponent {

    private accountRegisterDetails: Register = { Email: null, FullName: null, PhoneNumber: null, Company: null }
    private activeButton: string = "team";
    private showError: boolean = false;
    private messageObject:string='';
    constructor(private globalParamsService: GlobalParamsService, private _contactService: ContactService) { }
    currentActiveTab(tabName: string) {
        this.activeButton = tabName;
    }

    sendEnterpriseParams(valid: boolean) {
        if (valid) {
            this.showError = false;
            console.log(this.createEmail())
            this.globalParamsService.Loader({ show: true, text: 'Sending' });
            this._contactService.sendContact(this.createEmail()).subscribe((res: any) => {
                this.globalParamsService.Loader({ show: false, text: '' });
                this.messageObject= 'Thanks.we got it and we will get back to you shortly.';
                setTimeout(() => {
                    this.messageObject = "";
                }, 5000);
            }
                ,
                (error: any) => {
                    this.messageObject= this.globalParamsService.handlErrors(error) == "" ? 'server error try again' : this.globalParamsService.handlErrors(error);
                    this.globalParamsService.Loader({ show: false, text: '' });
                });
        }
        else {
            this.showError = true;
        }
    }

    createEmail(): ContactModel {
        let params: ContactModel
            = {
                "Email": '',
                'Name': '',
                'Message': ''
            };

        params.Email = this.accountRegisterDetails.Email;
        params.Name = this.accountRegisterDetails.FullName;
        params.Message = 'enterprise connection details: ' + this.accountRegisterDetails.Company + ' phone: ' + this.accountRegisterDetails.PhoneNumber;

        return params;
    }
}
