import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { WorkerModel, TagsModel } from "../models/worker.model";
import { CompanyInfoService } from './companyInfo.service';

@Injectable()
export class TeamSharedService {

    public currentEdit: WorkerModel

    constructor(private _companyInfoService: CompanyInfoService) { }
    getCurrentEdit() {
        if (!this.currentEdit) {
            return this.defaultWorker();
        }
        return this.currentEdit;
    }

    setCurrentEdit(worker: WorkerModel) {
        this.currentEdit = worker;
    }


    defaultWorker(): WorkerModel {
        let worker: WorkerModel = { Id: null, Name: '', Phone: '', Sip: '', Email:'',Tags: [], CompanyId: this._companyInfoService.get() };
        return worker;
    }
}