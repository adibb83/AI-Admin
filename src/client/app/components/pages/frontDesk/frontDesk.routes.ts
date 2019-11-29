import { Routes } from '@angular/router';
import { CompanyComponent } from './company/index';
import { ChangeVNumberDialog } from './change-v-number-dialog/change-v-number-dialog.component';
import { ConfirmDeactivateCompany } from '../../../confirmDeactivateGuard/confirmDeactivateCompany';


export const frontDeskRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'company'
    },
     {
        path: 'company',
        component: CompanyComponent,
        canDeactivate: [ConfirmDeactivateCompany]
    },
    {
        path: 'change-v-number',
        component: ChangeVNumberDialog
    },
];