import { Component, OnInit } from "@angular/core";
import { GlobalParamsService } from '../../../../services/globalParams.service';
import { Subscription } from 'rxjs/Subscription';
import { ContactModel } from '../../../../models/contact.model';
import { ContactService } from '../../../../services/home-contact.service';

@Component({
    moduleId: module.id,
    selector: 'contact-us',
    styleUrls: ['./contact-us.component.css'],
    templateUrl: './contact-us.component.html',
    providers: [ContactService]
})

export class ContactUsComponent {
    private message: string;
    private contact: ContactModel = {
        "Email": '',
        'Name': '',
        'Message': ''
    }
    constructor(private globalParamsService: GlobalParamsService, private _contactService: ContactService) { }

    sendMessageFunc(valid: boolean, value: any) {
        if (valid) {
            this.globalParamsService.Loader({show:true,text:'Sending'});
            this._contactService.sendContact(this.contact).subscribe((res: any) => {
                this.globalParamsService.Loader({show:false,text:''});
                this.message = 'Thanks.we got it and welcome to the future.';
                setTimeout(() => {
                    this.message = "";
                }, 5000);
            }
                ,
                (error: any) => {
                    this.message = this.globalParamsService.handlErrors(error) == "" ? 'server error try again' : this.globalParamsService.handlErrors(error);
                    this.globalParamsService.Loader({show:false,text:''});
                    setTimeout(() => {
                        this.message = "";
                    }, 5000)
                });
        }
    }
}
