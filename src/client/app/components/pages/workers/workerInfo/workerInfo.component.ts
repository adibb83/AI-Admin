import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, HostListener } from "@angular/core";
import { WorkerModel, TagsModel } from "../../../../models/worker.model";
import { FormControl, NgForm } from '@angular/forms'
import { TeamService } from '../../../../services/team.service';
import { GlobalParamsService } from '../../../../services/globalParams.service';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TeamSharedService } from '../../../../services/team-shared.service';
import { DOCUMENT } from '@angular/platform-browser'

@Component({
    moduleId: module.id,
    selector: 'worker-Info',
    styleUrls: ['./workerInfo.component.css'],
    templateUrl: './workerInfo.component.html',

    providers: [TeamService]

})

export class WorkerInfoComponent implements OnInit, OnDestroy {
    private workerInfo: WorkerModel;
    public isChanges: boolean = false;
    public showSaveBanner: boolean = false;
    public nameAsSynonym: boolean = true;
    @ViewChild('workerEditForm') public workerEditForm: NgForm;
    @ViewChild('newSynonym') newSynonym: ElementRef;
    public currentScrollPosition: string = '0';

    constructor( @Inject(DOCUMENT) private document: any, private _router: Router, private _teamService: TeamService, public dialog: MdDialog, private globalParamsService: GlobalParamsService, private _teamSharedService: TeamSharedService) { }


    ngOnInit() {
        this.workerInfo = this._teamSharedService.getCurrentEdit();

    }

    ngOnDestroy() {
        this.globalParamsService.Loader({ show: false, text: '' });
    }

    returnToTeam() {
        this._router.navigate(['/pages/workers', 'team']);
    }

    yesNoSaveChanges(event: boolean) {
        if (event) {
            if (!this.workerEditForm.valid) return;
            this.saveWorker(this.workerEditForm.valid, this.workerEditForm.value);
            this._router.navigate(['/pages/workers', 'team']);
        }
        this.showSaveBanner = false;
        this.isChanges = false;
        this._router.navigate(['/pages/workers', 'team']);
    }

    nameInputFocusOut(name: string) {
        if (!this.workerInfo.Id && this.nameAsSynonym) {
            var split = name.trim().split(" ");
            split.forEach(element => {
                this.workerInfo.Tags.push({ Id: null, Contents: element })
            });
            this.nameAsSynonym = false;
        }
    }


    public getYposition(): string {
        return document.getElementsByClassName('content-container')[1].scrollTop.toString() + 'px';
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    onEnter(value: string) {
        if (!this.isEmpty(value)) {
            this.workerInfo.Tags.push({ Id: null, Contents: value });
            value = '';
        }
    }

    isEmpty(str: string) {
        return (!str || 0 === str.length || !str.replace(/\s/g, '').length);
    }

    deleteRow(index: any) {
        this.workerInfo.Tags.splice(index, 1);
    }

    saveWorker(valid: boolean, value: any) {
        if (valid && (this.workerInfo.Sip || this.workerInfo.Phone)) {
            this.globalParamsService.Loader({ show: true, text: 'Saving' })

            if (!this.isEmpty(this.newSynonym.nativeElement.value)) {
                this.workerInfo.Tags.push({ Id: null, Contents: this.newSynonym.nativeElement.value });
                this.newSynonym.nativeElement.value = "";
            }

            this.workerInfo.Tags = this.workerInfo.Tags.filter((tag: any) => tag.Contents != undefined);
            this._teamService.create(this.workerInfo)
                .subscribe((res: any) => {
                    console.log(res)
                    if (!this.workerInfo.Id && res['_body']) {
                        var responsToJson = JSON.parse(res['_body']);
                        this.workerInfo.Id = responsToJson.Id;
                    }
                    this.isChanges = false;
                    this.globalParamsService.showAlart(true, 'Worker was saved');
                    this.globalParamsService.Loader({ show: false, text: '' })
                },
                (error: any) => {
                    console.log(error);
                    this.globalParamsService.showAlart(true, this.globalParamsService.handlErrors(error) == "" ? 'Server Error - data was not saved' : this.globalParamsService.handlErrors(error));
                    this.globalParamsService.Loader({ show: false, text: '' })
                });
        }
        else {
            this.globalParamsService.showAlart(true, 'name is required and at least one connection detail! last worker wasent save')
        }
    }
}

// if (!this.workerInfo.Id && res['_body']) {
                    //     var responsToJson = JSON.parse(res['_body']);
                    //     this.workerInfo.Id = responsToJson.Id;
                    // }

    // changeHapend() {
    //     this.haveChange.emit(true);
    //     this.haveChanges = true;
    // }

    // ngOnChanges(changes: any) {
    //     // changes.prop contains the old and the new value...
    //     if ((changes && changes.workerInfo && changes.workerInfo.previousValue && this.haveChanges && !this.workerSaved && !this.deletedWorker)
    //         || (changes && changes.workerInfo && changes.workerInfo.previousValue && (typeof changes.workerInfo.previousValue.Id !== 'undefined') && changes.workerInfo.previousValue.Id == null) && !this.deletedWorker) {
    //         this.openDialog(changes.workerInfo.previousValue);
    //     }
    //     setTimeout(() => {
    //         this.haveChanges = false;
    //         this.haveChange.emit(false);
    //         this.workerSaved = false;
    //     }, 500)

    // }

      // openDialog() {
    //     this.isChanges = false;
    //     let dialogRef = this.dialog.open(YesNoDialog,
    //         {
    //             height: '200px',
    //             width: '400px'
    //         }
    //     );

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result != 'Cancel') {
    //             this.saveWorker();
    //             this._router.navigate(['/pages', 'team']);
    //         }
    //         else {
    //             this._router.navigate(['/pages', 'team']);
    //         }
    //     });
    // }