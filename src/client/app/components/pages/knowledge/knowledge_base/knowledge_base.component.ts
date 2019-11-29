import { Component, OnInit, OnDestroy } from "@angular/core";
import { KnowledgeModel, SubjectRequestModel } from "../../../../models/knowledge.model";
import { KnowledgeTypeModel } from "../../../../models/knowledgeType.model";
import { GlobalParamsService } from '../../../../services/globalParams.service';
import { CompanyInfoService } from '../../../../services/companyInfo.service';
import { KnowlegeBaseService } from '../../../../services/knowlegeBase.service';
import { KnowledgeSharedService } from '../../../../services/knowledge-shared.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  moduleId: module.id,
  styleUrls: ['./knowledge_base.component.css'],
  templateUrl: './knowledge_base.component.html',
  providers: [KnowlegeBaseService]
})
export class Knowledge_baseComponent implements OnInit, OnDestroy {
  public KnowledgeArray: KnowledgeTypeModel[];
  public templateKnowledgeArray: KnowledgeTypeModel[];
  public userKnowledgeArray: KnowledgeTypeModel[];
  private selectedKnowledge: KnowledgeTypeModel;

  constructor(
    private _companyInfoService: CompanyInfoService,
    private globalParamsService: GlobalParamsService,
    private _knowlegeBaseService: KnowlegeBaseService,
    private _knowledgeSharedService: KnowledgeSharedService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.globalParamsService.Loader({show:false,text:''});
  }
  loadData() {
    this.globalParamsService.Loader({show:true,text:'Loading'});
    this._knowlegeBaseService.loadKnowlegesIdAndNames().subscribe(res => {
      this.KnowledgeArray = res;
      if (this.KnowledgeArray) this.filterKnowledgesByType();
      this.globalParamsService.Loader({show:false,text:''});
    },
      error => {
        console.log(error);
        this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) == "" ? 'Server Error Faild To Load Data.' : this.globalParamsService.handlErrors(error));
        this.globalParamsService.Loader({show:false,text:''});
      });
  }

  filterKnowledgesByType() {
    this.templateKnowledgeArray = this.KnowledgeArray.filter(knowledgeName => knowledgeName.IsTemplate == true);
    this.userKnowledgeArray = this.KnowledgeArray.filter(knowledgeName => knowledgeName.IsTemplate == false);
  }

  KnowledgeStateChanged(temlateKnowledge: KnowledgeTypeModel) {
  
    this._knowlegeBaseService.changeTemplateKnowledgeIsEnabled(temlateKnowledge).subscribe(res => {
      console.log(res);
    },
      error => {
        console.log(error);
        this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) == "" ? 'Server Error Faild To Load Data.' : this.globalParamsService.handlErrors(error));
      });
  }



  showSelectedknowledge(knowledge: KnowledgeTypeModel, index: number) {
    this._knowledgeSharedService.setCurrentEdit(knowledge);
    this._router.navigate(['/pages/knowledge', 'knowledgeInfo']);
    // this.selectedKnowledge = knowledge;
    // this.selectedRow = index;
  }

  addNewSubject() {
    this._knowledgeSharedService.setCurrentEdit(null);
    this._router.navigate(['/pages/knowledge', 'knowledgeInfo']);

  }

  // getDefaultKnowledgeModel(): KnowledgeModel {
  //   return { Id: null, Header: '', Description: '', SubjectRequests: [], Response: '', CompanyId: this._companyInfoService.get() };
  // }

  deleteKnowlageBase(index: number) {
    this.globalParamsService.Loader({show:true,text:'Deleting'});
    if (this.userKnowledgeArray[index].Id) {
      this._knowlegeBaseService.delete(this.userKnowledgeArray[index].Id)
        .subscribe(res => {
          this.userKnowledgeArray.splice(index, 1);
          this.globalParamsService.showAlart(true, 'Item Was Deleted');
          this.globalParamsService.Loader({show:false,text:''});
        },
        error => {
          console.log(error);
          this.globalParamsService.Loader({show:false,text:''});
          this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) == "" ? 'Server Error - The file is not deleted' : this.globalParamsService.handlErrors(error));
        });
    }
  }


  // save() {
  //   this.selectedKnowledge.SubjectRequests = this.selectedKnowledge.SubjectRequests.filter(tag => tag.Contents != undefined);
  //   this._knowlegeBaseService.create(this.selectedKnowledge).subscribe((res: any) => {

  //     if (!this.selectedKnowledge.Id && res['_body']) {
  //       var responsToJson = JSON.parse(res['_body']);
  //       this.selectedKnowledge.Id = responsToJson.Id;
  //     }

  //     this.globalParamsService.showAlart(true, 'Item Saved');

  //   },
  //     (error: any) => {
  //       console.log(error);
  //       this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) == "" ? 'Server-Error ,The file is not saved' : this.globalParamsService.handlErrors(error));

  //     });

  // }
  // openDialog() {
  //   let dialogRef = this.dialog.open(YesNoDialog,
  //     {
  //       height: '200px',
  //       width: '400px'
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result != 'Cancel') {
  //       this.save();
  //     }
  //     else {
  //       this.currentKnowledgeHaveChanges = false;
  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   if (this.currentKnowledgeHaveChanges) {
  //     this.openDialog()
  //   }
  // }
}


 // convertJsonToKnowlege(data: any[]) {
  //   this.KnowledgeArray = [];

  //   if (data && data.length > 0) {
  //     data.forEach(element => {
  //       let subjects: SubjectRequestModel[] = [];
  //       element.SubjectRequests.forEach((sub:any) => {
  //         subjects.push({Id:sub.Id,Contents:sub.Contents})
  //       });
  //       this.KnowledgeArray.push({Id:element.Id,Header:element.Header,Description: element.Description,SubjectRequests: subjects,Response: element.Response,CompanyId: element.CompanyId});
  //     });
  //   }
  //   else {
  //     this.KnowledgeArray = [this.getDefaultKnowledgeModel()]
  //   }
  // }