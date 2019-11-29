import { Component, OnInit } from "@angular/core";
import { FormModel, NameAndValue } from "../../../models/form.model"
import { CompanyInfoService } from '../../../services/companyInfo.service';
import { GlobalParamsService } from '../../../services/globalParams.service';
import { FormesService } from '../../../services/formes.service';

@Component({
  moduleId: module.id,
  styleUrls: ['./forms.component.css'],
  templateUrl: './forms.component.html',
  providers: [FormesService]
})
export class FormsComponent implements OnInit {

  public formsList: FormModel[];
  private selectedRow: number = 0;
  private selectedForm: FormModel;
  private isEdit: boolean = false;
  constructor(private globalParamsService:GlobalParamsService,private _companyInfoService: CompanyInfoService, private _formesService: FormesService) { }

  ngOnInit() {

    this._formesService.loadSingle().subscribe(res => {
      this.convertJsonToForms(res);
      this.selectedForm = this.formsList[0];
    },
      error => {
        console.log(error);
         this.globalParamsService.showAlart(true, 'Server Error - faild to load data');
      });
  }


  convertJsonToForms(data: any[]) {
    this.formsList = [];
    if (data && data.length > 0 ) {
      data.forEach(element => {
        let _FormFields: NameAndValue[] = [];
        element.FormFields.forEach((field:any) => {
          _FormFields.push(new NameAndValue(field.Id, field.Name, field.Value, field.ValidationType, field.OrderNumber))
        });
        this.formsList.push(new FormModel(element.Id, element.CompanyId, element.Name, element.Email, _FormFields));
      });

    }
    else {
      this.formsList.push(this.getDefualtFormModle());
    }
  }


  addNewform() {
    this.formsList.push(this.getDefualtFormModle());
    this.selectedForm = this.formsList[this.formsList.length - 1];
    this.selectedRow = this.formsList.length - 1;
    this.isEdit = true;
  }

  getDefualtFormModle(): FormModel {
    let defaultForm: FormModel = new FormModel(null, this._companyInfoService.get(), '', '', [new NameAndValue(null, 'field', '', '1', '1')]);
    return defaultForm;
  }

  showSelectedForm(form: FormModel, index: number) {
    this.selectedForm = form;
    this.selectedRow = index;
  }

  deleteForm(event:any, index:any) {
    if (this.formsList[index].id) {
      this._formesService.delete(this.formsList[index].id)
        .subscribe(res => {
          this.formsList.splice(index, 1);
          this.selectedForm = this.formsList[0];
          this.selectedRow = 0;
          this.globalParamsService.showAlart(true, 'Item Was Deleted');
        },
        error => {
          console.log(error);
          this.globalParamsService.showAlart(true, 'Server Error - Item Was Not Deleted');
        });
    }
    else {
      this.formsList.splice(index, 1);
      this.selectedForm = this.formsList[0];
      this.selectedRow = 0;
    }

  }

}
