
import { Component, OnInit, OnDestroy } from "@angular/core";
import { WorkerModel, TagsModel } from "../../../../models/worker.model"
import { GlobalParamsService } from '../../../../services/globalParams.service';
import { TeamService } from '../../../../services/team.service';
import { TeamSharedService } from '../../../../services/team-shared.service';
import { CompanyInfoService } from '../../../../services/companyInfo.service';
import { Observable } from 'rxjs/Rx';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  moduleId: module.id,
  styleUrls: ['./team.component.css'],
  templateUrl: './team.component.html',
  providers: [TeamService]
})


export class TeamComponent implements OnInit, OnDestroy {
  private selectedRow: number = 0;
  private showLoader: boolean = false;
  public currentWorkerSaved: boolean = false;
  public deletedWorker: boolean = false;
  public currentWorkerHaveChanges: boolean = false;
  private editMode: boolean = false;
  private sortActive: boolean = true;
  private sortBy: string = 'name';
  public workers: WorkerModel[];
  public selectedWorker: WorkerModel;



  constructor(private _companyInfoService: CompanyInfoService,
    private globalParamsService: GlobalParamsService,
    private _teamService: TeamService,
    private _teamSharedService: TeamSharedService,
    private _router: Router,
    public dialog: MdDialog) { }

  ngOnInit() {
    this.globalParamsService.Loader({show:true,text:'Loading'});
    this._teamService.loadSingle().subscribe(res => {
      this.workers = res;
      this.globalParamsService.Loader({show:false,text:''});
    },
      error => {
        console.log(error);
        this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) == "" ? 'Server Error - faild to load data' : this.globalParamsService.handlErrors(error));
        this.globalParamsService.Loader({show:false,text:''});
      });
  }


  haveChanges(changed: boolean): void {
    this.currentWorkerHaveChanges = changed;
  }

  selectWorker(worker: WorkerModel, index: number) {
    this._teamSharedService.setCurrentEdit(worker);
    this._router.navigate(['/pages/workers', 'workerInfo']);
    // this.selectedWorker = worker;
    // this.selectedRow = index;
    // this.deletedWorker =false;
  }



  addNewMember() {
    this._teamSharedService.setCurrentEdit(this.defaultWorker());
    this._router.navigate(['/pages/workers', 'workerInfo']);
  }

 

  deleteWorker(index:number, id:string) {
    // let index: number = this.workers.map(function (x) { return x.Id; }).indexOf(this.selectedWorker.Id);
    // if (this.selectedWorker.Id) {
      this.globalParamsService.Loader({show:true,text:'Deleting'});
      this._teamService.delete(id)
        .subscribe(res => {
          this.workers.splice(index, 1);
          this.globalParamsService.showAlart(true, 'Worker Deleted');
          this.globalParamsService.Loader({show:false,text:''});
        },
        error => {
          console.log(error);
          this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) ? 'Server Error - faild to delete worker' : this.globalParamsService.handlErrors(error));
          this.globalParamsService.Loader({show:false,text:''});
        });
    // }
    // else {
    //   this.workers.splice(index, 1);
    //   this.deletedWorker = true;
    //   this.selectedWorker = this.workers[0];
    //   this.globalParamsService.showAlart(true, 'Worker Deleted');
    //   this.globalParamsService.Loader(false);
    // }

  }

  defaultWorker(): WorkerModel {
    let worker: WorkerModel = { Id: null, Name: '', Phone: '', Sip: '', Email: '', Tags: [], CompanyId: this._companyInfoService.get() };
    return worker;
  }



  ngOnDestroy() {
   
    this.globalParamsService.Loader({show:false,text:''});
    // if (!this.currentWorkerSaved && this.currentWorkerHaveChanges) {
    //   this.openDialog()
    // }
  }

  sort() {

    this.sortActive = !this.sortActive;
    if (this.sortBy == 'name') {
      this.sortBy = 'extension';
    }
    else {
      this.sortBy = 'name';
    }

  }
}



  // openDialog() {
  //   let dialogRef = this.dialog.open(YesNoDialog,
  //     {
  //       height: '200px',
  //       width: '400px'
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result != 'Cancel') {
  //       //this.saveWorker();
  //     }

  //   });
  // }

   // saveWorker() {
  //   var regex = "\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$";
  //   if (this.selectedWorker.Name && (this.selectedWorker.Sip || this.selectedWorker.Phone)) {
  //     if (this.selectedWorker.Phone && !this.selectedWorker.Phone.match(regex)) return;
  //     this.showLoader = !this.showLoader;
  //     this.selectedWorker.Tags = this.selectedWorker.Tags.filter(tag => tag.Contents != undefined);
  //     this._teamService.create(this.selectedWorker)
  //       .subscribe((res: any) => {
  //         if (!this.selectedWorker.Id && res['_body']) {
  //           var responsToJson = JSON.parse(res['_body']);
  //           this.selectedWorker.Id = responsToJson.Id;
  //         }
  //         this.globalParamsService.showAlart(true, 'Worker was saved');
  //         this.currentWorkerSaved = true;
  //         this.showLoader = !this.showLoader;
  //       },
  //       (error: any) => {
  //         console.log(error);
  //         this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) == "" ? 'Server Error - data was not saved' : this.globalParamsService.handlErrors(error));
  //         this.showLoader = !this.showLoader;
  //       });
  //   }
  //   else {
  //     this.globalParamsService.showAlart(true, 'name is required and at least one connection detail')
  //   }
  // }