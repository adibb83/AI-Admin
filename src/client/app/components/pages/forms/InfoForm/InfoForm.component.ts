import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormesService } from '../../../../services/formes.service';
import { GlobalParamsService } from '../../../../services/globalParams.service';
import { FormModel,NameAndValue } from "../../../../models/form.model"
@Component({
  moduleId: module.id,
  selector: 'form-info',
  styleUrls: ['./infoForm.component.css'],
  templateUrl: './infoForm.component.html',
})
export class InfoFormComponent  {
  @Input() formData: FormModel;
  @Output() delete = new EventEmitter();
  @Input() isEdit: boolean = false;

  constructor(private _formesService: FormesService, private _globalParamsService: GlobalParamsService) { }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  onEnter(index: number) {
    this.formData.FormFields.push(new NameAndValue(null,'field'+index.toString(),'','1',index.toString()));
  }

  save() {
    this._formesService.create(this.formData).subscribe((res:any) => {res
      this._globalParamsService.showAlart(true, 'Item Saved');
    },
      (error:any) => {
        console.log(error);
        this._globalParamsService.showAlart(true, 'Server-Error ,Item was not Saved');
      });
  }
}
