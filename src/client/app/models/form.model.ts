export class FormModel {
    id: string;
    companyId:string;
    name: string;
    email: string;
    FormFields: NameAndValue[];
    constructor(
        _id: string,
        _companyId:string,
        _formName: string,
        _email: string,
        _formFildes: NameAndValue[]
    
    ) {
        this.id = _id;
        this.companyId = _companyId;
        this.email = _email;
        this.name = _formName;
        this.FormFields = _formFildes;
    }


}

export class NameAndValue {
    id: string;
    name: string;
    value: string;
    validationType: string;
    orderNumber:string;

    constructor(
        _id: string,
        _fieldName: string,
        _value: string,
        _validationType: string,
        _orderNumber:string
    ) {
        this.id = _id;
        this.name = _fieldName;
        this.value = _value;
        this.validationType = _validationType;
        this.orderNumber =_orderNumber;
    }
}