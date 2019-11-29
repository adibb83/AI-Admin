
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ROUTING } from "./app.routing";
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { GlobalParamsService } from './services/globalParams.service';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import 'chart.js/dist/Chart.js';
import { APP_BASE_HREF } from '@angular/common';
//account 
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/account/home/home.component';
import { AccountLoginComponent } from './components/account/login/account-login.component';
//import { DialogForgotPassword } from './components/account/login/dialog-forgotPassword/dialog-forgotPassword.component';
import { ForgotPasswordConfirmation } from './components/account/forgot-password-confirmation/forgotPasswordConfirmation.component';
import { AccountRegisterComponent } from './components/account/register/account-register.component';
import { AccountConfirmationComponent } from './components/account/account-confirmation/account-confirmation.component';
import { FooterComponent } from './components/account/footer/footer.component';
import { TermsComponent } from './components/account/company/terms/terms.component';
import { PrivacyComponent } from './components/account/support/privacy/privacy.component';
import { PricingComponent } from './components/account/support/pricing/pricing.component';
import { BusinessComponent } from './components/account/read-more/business/business.component';
import { DevelopersComponent } from './components/account/read-more/developers/developers.component';
import { ContactUsComponent } from './components/account/company/contact-us/contact-us.component';
import { DynamicViewComponent } from './components/account/dynamic-view/dynamic-view.component';
import { FaqsComponent } from './components/account/support/faqs/faqs.component';
import { ForgotPasswordEmailComponent } from './components/account/forgot-password-email/forgot-password-email.component';

//pages ======================================================================================================================
import { PagesComponent } from './components/pages/pages.component';

//admin
import { AdminComponent } from './components/pages/admin/admin.component';
//Front Desk
import { FrontDeskComponent } from './components/pages/frontDesk/frontDesk.component';
import { CompanyComponent } from './components/pages/frontDesk/company/company.component';
import { ChangeVNumberDialog } from './components/pages/frontDesk/change-v-number-dialog/change-v-number-dialog.component';
//Team
import {WorkersComponent} from './components/pages/workers/workers.component';
import { TeamComponent } from './components/pages/workers/team/team.component';
import { WorkerInfoComponent } from './components/pages/workers/workerInfo/workerInfo.component';
//Knowledge
import {KnowledgeComponent} from './components/pages/knowledge/knowledge.component';
import { KnowledgeEntityComponent } from './components/pages/knowledge/knowledge_entity/knowledge_entity.component';
import { Knowledge_baseComponent } from './components/pages/knowledge/knowledge_base/knowledge_base.component';
//Call Log
import { CallsComponent } from './components/pages/calls/calls.component';
import { CallLogComponent } from './components/pages/calls/call-log/call-log.component';
import { CallDetailsComponent } from './components/pages/calls/call-details/call-details.component';

//forms NOT ACTIVE
import { FormsComponent } from './components/pages/forms/forms.component';
import { InfoFormComponent } from './components/pages/forms/infoform/infoform.component';



//directives
import { MouseWheelDirective } from './directives/mouseWheel.directive';

//pipes
import { FilterTags } from './pipes/filter-worker-tags-pipe';
import { OrderBy } from './pipes/orderBy.pipe';
import { SearchInputFilterPipe } from './pipes/searchInput.pipe';
import { ExtractModelErrors } from './pipes/extract-model-errors.pipe';
import { SafePipe } from './pipes/safePipe.pipe';

//services
import { HeadersService } from './services/headers.service';
import { AuthTokenService } from './services/auth-token.service';
import { AuthGuard } from './services/auth-guard.service';
import { CompanyInfoService } from './services/companyInfo.service'
import { CookieService } from 'angular2-cookie/core';
import { TeamSharedService } from './services/team-shared.service';
import { KnowledgeSharedService } from './services/knowledge-shared.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service'


//validators
import { EqualValidator } from './validators/equal-validator.directive';
import { ConfirmDeactivateCompany } from './confirmDeactivateGuard/confirmDeactivateCompany';
import { ConfirmDeactivateWorkerInfo } from './confirmDeactivateGuard/confirmDeactivateWorkerInfo';
import { ConfirmDeactivateKnowledgeEntity } from './confirmDeactivateGuard/confirmDeactivateKnowledgeInfo';

//Dialogs

//import { YesNoDialog } from './components/pages/yesNoDialog/yesNoDialog.component';

//message helpers
import { ErrorPanelComponent } from './helpers/error-panel/error-panel.component';
import { SuccessPanelComponent } from './helpers/success-panel/success-panel.component';
import { SaveChangesPanelComponent } from './helpers/save-changes-panel/save-changes-panel.component';
import { LineChartComponent } from './helpers/charts/line-chart.component';
// const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true,
// };

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,

    MaterialModule.forRoot(),
    ReactiveFormsModule,
    ROUTING,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    AccountComponent,
    HomeComponent,
    BusinessComponent,
    DevelopersComponent,
    AccountLoginComponent,
    AccountRegisterComponent,
    AccountConfirmationComponent,
    FooterComponent,
    DynamicViewComponent,
    FaqsComponent,
    PagesComponent,
    WorkersComponent,
    WorkerInfoComponent,
    KnowledgeComponent,
    KnowledgeEntityComponent,
    FrontDeskComponent,
    CompanyComponent,
    TeamComponent,
    Knowledge_baseComponent,
    SearchInputFilterPipe,
    ExtractModelErrors,
    CallsComponent,
    CallLogComponent,
    CallDetailsComponent,
    FilterTags,
    SafePipe,
    OrderBy,
    TermsComponent,
    ContactUsComponent,
    PrivacyComponent,
    PricingComponent,
    ForgotPasswordConfirmation,
    EqualValidator,
    ChangeVNumberDialog,
    AdminComponent,
    LineChartComponent,
    ErrorPanelComponent,
    SuccessPanelComponent,
    SaveChangesPanelComponent,
    ForgotPasswordEmailComponent,
    MouseWheelDirective
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    GlobalParamsService,
    CookieService,
    AuthTokenService,
    AuthGuard,
    AdminAuthGuard,
    HeadersService,
    CompanyInfoService,
    TeamSharedService,
    KnowledgeSharedService,
    ConfirmDeactivateCompany,
    ConfirmDeactivateWorkerInfo,
    ConfirmDeactivateKnowledgeEntity
  ],
  bootstrap: [AppComponent]
})

export class AppModule {


}


// @NgModule({
//   imports: [BrowserModule, HttpModule, AppRoutingModule, AboutModule, HomeModule, SharedModule.forRoot()],
//   declarations: [AppComponent],
//   providers: [{
//     provide: APP_BASE_HREF,
//     useValue: '<%= APP_BASE %>'
//   }],
//   bootstrap: [AppComponent]

// })
// export class AppModule { }
