export interface WorkerModel {
  Id?:string;
  Name: string;
  Phone: string;
  Sip: string;
  Email:string;
  Tags: TagsModel[];
  CompanyId:string;
}


export interface TagsModel {
  Id: string;
  Contents: string;
}
