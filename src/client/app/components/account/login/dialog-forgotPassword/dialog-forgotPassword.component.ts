import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
    moduleId: module.id,
    selector: 'dialogforgotPassword',
    templateUrl: 'dialog-forgotPassword.component.html',
    styleUrls:['./dialog-forgotPassword.component.css']
})

export class DialogForgotPassword {

   
    public emailstr: string;
    constructor(public dialogRef: MdDialogRef<DialogForgotPassword>) {}

    onEnter(valid:boolean ,value: any) {
        this.dialogRef.close(this.emailstr);
    }
}