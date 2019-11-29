import { Component, OnInit, ViewChild, ElementRef, HostListener } from "@angular/core";
import { KnowledgeModel, SubjectRequestModel } from "../../../../models/knowledge.model"
import { KnowlegeBaseService } from '../../../../services/knowlegeBase.service';
import { GlobalParamsService } from '../../../../services/globalParams.service';
import { KnowledgeSharedService } from '../../../../services/knowledge-shared.service';
import { CompanyInfoService } from '../../../../services/companyInfo.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'knowledgeEntity',
    styleUrls: ['./knowledge_entity.component.css'],
    templateUrl: './knowledge_entity.component.html',
    providers: [KnowlegeBaseService]
})

export class KnowledgeEntityComponent implements OnInit {

    private knowledgeInfo: KnowledgeModel;
    private showLoader: boolean = false;
    public isChanges: boolean = false;
    public showSaveBanner: boolean = false;
    @ViewChild('newSynonym') newSynonym: ElementRef;
    @ViewChild('newRespons') newRespons: ElementRef;
   
    constructor(
        private _knowledgeSharedService: KnowledgeSharedService,
        private _companyInfoService: CompanyInfoService,
        private _router: Router,
        private _knowlegeBaseService: KnowlegeBaseService,
        private _globalParamsService: GlobalParamsService,
        ) { }



    ngOnInit() {
        this._globalParamsService.Loader({show:true,text:'Loading'});
        if (this._knowledgeSharedService.getCurrentEdit()) {
            this._knowlegeBaseService.loadKnowledgeById(this._knowledgeSharedService.getCurrentEdit().Id).subscribe(res => {
                this.knowledgeInfo = res;
                this._globalParamsService.Loader({show:false,text:''});
            },
                error => {
                    console.log(error);
                    this._globalParamsService.showAlart(true, this._globalParamsService.handlErrors(error) == "" ? 'Server Error Faild To Load Data.' : this._globalParamsService.handlErrors(error));
                    this._globalParamsService.Loader({show:false,text:''});
                });
        }
        else {
            this.knowledgeInfo = this.getDefaultKnowledgeModel();
            this._globalParamsService.Loader({show:false,text:''});
        }

    }



    getDefaultKnowledgeModel(): KnowledgeModel {
        return { Id: null, Header: '', Description: '', SubjectRequests: [], Responses: [], CompanyId: this._companyInfoService.get() };
    }

    returnToKnowledge() {
            this._router.navigate(['/pages/knowledge', 'knowledge_base']);
    }

    yesNoSaveChanges(event: boolean) {
        if (event) {
            this.save();
            this._router.navigate(['/pages/knowledge', 'knowledge_base']);
        }
        this.showSaveBanner = false;
        this.isChanges = false;
        this._router.navigate(['/pages/knowledge', 'knowledge_base']);
    }

     public getYposition(): string{
        return  document.getElementsByClassName('content-container')[1].scrollTop.toString() +'px';
    }

    onEnter(value: string) {
        if (!this.isEmpty(value)) {
            this.knowledgeInfo.SubjectRequests.push({ Id: null, Contents: value });
            value = '';
        }

    }

    deleteRow(index: any) {
        this.knowledgeInfo.SubjectRequests.splice(index, 1);
        this.isChanges = true;
    }


    deleteResponse(index: any) {
        this.knowledgeInfo.Responses.splice(index, 1);
        this.isChanges = true;
    }

    onEnterRespond(value: string) {
        if (!this.isEmpty(value)) {
            this.knowledgeInfo.Responses.push(value);
            value = '';
        }

    }

    isEmpty(str: string) {
        return (!str || 0 === str.length || !str.replace(/\s/g, '').length);
    }


    customTrackBy(index: number, obj: any): any {
        return index;
    }

    save() {
        this._globalParamsService.Loader({show:true,text:'Saving'});

        //insert input unsaved text
        if (!this.isEmpty(this.newSynonym.nativeElement.value)) {
            this.knowledgeInfo.SubjectRequests.push({ Id: null, Contents: this.newSynonym.nativeElement.value });
            this.newSynonym.nativeElement.value="";
        }

        if (!this.isEmpty(this.newRespons.nativeElement.value)) {
            this.knowledgeInfo.Responses.push(this.newRespons.nativeElement.value);
            this.newRespons.nativeElement.value="";
        }

        //remove empty tags
        this.knowledgeInfo.SubjectRequests = this.knowledgeInfo.SubjectRequests.filter(tag => tag.Contents != undefined);
        this.knowledgeInfo.Responses = this.knowledgeInfo.Responses.filter(tag => tag != undefined);


        //save
        this._knowlegeBaseService.create(this.knowledgeInfo).subscribe((res: any) => {
            if (!this.knowledgeInfo.Id && res['_body']) {
                var responsToJson = JSON.parse(res['_body']);
                this.knowledgeInfo.Id = responsToJson.Id;
            }
            this.isChanges = false;
            this._globalParamsService.showAlart(true, 'Item Saved');
            this._globalParamsService.Loader({show:false,text:''});
        },
            (error: any) => {
                console.log(error);
                this._globalParamsService.showAlart(true, this._globalParamsService.handlErrors(error) == "" ? 'Server-Error ,The file is not saved' : this._globalParamsService.handlErrors(error));
                this._globalParamsService.Loader({show:false,text:''});
            });

    }
}

