import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountRegisterComponent } from './register/account-register.component';
import { AccountLoginComponent } from './login/account-login.component';
import {ForgotPasswordEmailComponent} from './forgot-password-email/forgot-password-email.component';
import { TermsComponent } from './company/terms/terms.component';
import {ContactUsComponent} from './company/contact-us/contact-us.component';
import { AuthGuard } from '../../services/auth-guard.service';
import { PrivacyComponent } from './support/privacy/privacy.component';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { ForgotPasswordConfirmation } from './forgot-password-confirmation/forgotPasswordConfirmation.component'
import { BusinessComponent } from './read-more/business/business.component';
import { DevelopersComponent } from './read-more/developers/developers.component';
import { PricingComponent } from './support/pricing/pricing.component';
import {FaqsComponent} from './support/faqs/faqs.component';

export const AccountRoutes: Routes = [

    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'confirmation',
        component: AccountConfirmationComponent
    },
    {
        path: 'register',
        component: AccountRegisterComponent
    },
    {
        path: 'login',
        component: AccountLoginComponent
    },
    {
        path: 'forgotPasswordEmail',
        component: ForgotPasswordEmailComponent
    },
    {
        path: 'forgotPasswordConfirmation',
        component: ForgotPasswordConfirmation
    },
    {
        path: 'business',
        component: BusinessComponent
    },
    {
        path: 'developers',
        component: DevelopersComponent
    },
    {
        path: 'terms',
        component: TermsComponent
    }
    ,
    {
        path: 'contact-us',
        component: ContactUsComponent
    }
    ,
    {
        path: 'privacy',
        component: PrivacyComponent
    }
    ,
    {
        path: 'pricing',
        component: PricingComponent
    }
    ,
    {
        path: 'faqs',
        component: FaqsComponent
    }
];