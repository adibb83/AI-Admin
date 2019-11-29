import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
    moduleId: module.id,
    selector: 'yesNoDialog',
    styleUrls: ['./yesNoDialog.component.css'],
    templateUrl: 'yesNoDialog.component.html'
    
})

export class YesNoDialog {
    constructor(public dialogRef: MdDialogRef<YesNoDialog>) { }
}