import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { CompanyInfoService } from './companyInfo.service';
import { KnowledgeTypeModel } from "../models/knowledgeType.model";

@Injectable()
export class KnowledgeSharedService {

    public currentEdit: KnowledgeTypeModel | null;

    constructor(private _companyInfoService: CompanyInfoService) { }

    getCurrentEdit() {
       
        return this.currentEdit;
    }

    setCurrentEdit(knowledge: KnowledgeTypeModel) {
        this.currentEdit = knowledge;
    }


    
}