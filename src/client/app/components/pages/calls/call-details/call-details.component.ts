import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CallsService } from '../../../../services/calls.service';

@Component({
    moduleId: module.id,
    selector: 'call-details',
    templateUrl: 'call-details.component.html'
})

export class CallDetailsComponent implements OnInit {
    private data: Object;
    constructor(
        private _callsService: CallsService,
        private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        // console.log(this._activatedRoute.snapshot.params.id)
        // const callId = this._activatedRoute.snapshot.params.id;
        // this.data = this._callsService.loadSingle(callId);
    }

}
