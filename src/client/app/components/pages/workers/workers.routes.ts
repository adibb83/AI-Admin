import { Routes } from '@angular/router';
import { TeamComponent } from './team/index';
import { WorkerInfoComponent } from './workerInfo/index';
import { ConfirmDeactivateWorkerInfo } from '../../../confirmDeactivateGuard/confirmDeactivateWorkerInfo';

export const WorkersRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'team'
    },
     {
        path: 'team',
        component: TeamComponent
    },
    {
        path: 'workerInfo',
        component: WorkerInfoComponent,
        canDeactivate: [ConfirmDeactivateWorkerInfo]
    }
    ,
];