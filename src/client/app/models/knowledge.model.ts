export class KnowledgeModel {
  Id:string;
  Header: string;
  Description: string;
  SubjectRequests: SubjectRequestModel[];
  Responses: string[];
  CompanyId: string;


  // constructor(_id:string,_header: string, _description: string, _requests: SubjectRequestModel[], _response: string, _companyId: string) {
  //   this.id = _id;
  //   this.header = _header;
  //   this.description = _description;
  //   this.subjectRequests = _requests;
  //   this.response = _response;
  //   this.companyId = _companyId;
  // }
}

export class SubjectRequestModel {
  Id:string;
  Contents: string;
  

  //  constructor(_id:string, _contents:string )
  //  {
  //    this.id = _id;
  //    this.contents = _contents;
  //  }
}