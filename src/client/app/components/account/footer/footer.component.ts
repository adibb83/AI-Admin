import { Component, OnInit } from "@angular/core";
// import { GlobalParamsService } from '../../../services/globalParams.service';
// import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'account-footer',
  styleUrls: ['./footer.component.css'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  redirectToUrl(url:string)
  {
    window.location.href = url;
  }
} 