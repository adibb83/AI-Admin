import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import {LoaderModel} from '../models/loader.model'

@Injectable()
export class GlobalParamsService {
  public registerEmail:string;
  constructor(private _http: Http) { }

 
  // global Show Nav Bar
  private isHome = new BehaviorSubject<boolean>(true);
  showNav$ = this.isHome.asObservable();
  isHomeStatusChange(_isHome: boolean) {
    this.isHome.next(_isHome);
  }

  //global Message Alert
  private showMessage = new BehaviorSubject<any>({ message: '', showMessage: false });
  showMessage$ = this.showMessage.asObservable();

  showAlart(_show: boolean, _messege: string) {
    this.showMessage.next({ message: _messege, showMessage: _show });

    setTimeout(() => {
      this.showMessage.next({ message: '', showMessage: false });
    }, 3000);
  }


  handlErrors(err: any): string {
    let message: string = "";
    if (err.ModelState) {
      for (var key in err.ModelState) {
        // skip loop if the property is from prototype
        if (!err.ModelState.hasOwnProperty(key)) continue;

        var obj = err.ModelState[key];

        for (var prop in obj) {
          // skip loop if the property is from prototype
          if (!obj.hasOwnProperty(prop)) continue;
          message += obj[prop];
        }
      }
    }
    return message;
  }

  //global Message Alert
  private showLoader = new BehaviorSubject<LoaderModel>({show:false,text:"Loading"});
  showLoader$ = this.showLoader.asObservable();

  Loader(content: any) {
    this.showLoader.next(content);
  }

  create(phoneNumber: string) {
    let url: string = 'http://uk-dolores.sensiya.com/api/telechatbot/homepagecall/?destPhonenumber=' + phoneNumber;
    var headers = new Headers();
    headers.append('Authorization', '<my username password>');
    return this._http.post(url, { headers: headers })
      .map((res: any) => res)
      .catch((error: any) => Observable.throw(error || { Message: "Server error" }));
  }
}