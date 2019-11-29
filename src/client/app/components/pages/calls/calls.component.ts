import { Component } from '@angular/core';

import { CallsService } from '../../../services/calls.service';

@Component({
    moduleId: module.id,
    selector: 'app-calls',
    templateUrl: './calls.component.html',
    providers: [CallsService]
})
export class CallsComponent {
    constructor(private _callsService: CallsService) { }
}
