import { Routes } from '@angular/router';

import { CallLogComponent } from './call-log/call-log.component';
import { CallDetailsComponent } from './call-details/call-details.component';


export const CallsRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'log'
    },
    {
        path: 'log',
        component: CallLogComponent
    },
    {
        path: 'details/:id',
        component: CallDetailsComponent
    }
];