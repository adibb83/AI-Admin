import { Routes } from '@angular/router';



import { CallsComponent } from './calls/calls.component';
import { CallsRoutes } from './calls/calls.routes';

import { frontDeskRoutes } from './frontDesk/frontDesk.routes';
import {FrontDeskComponent} from './frontDesk/frontDesk.component';

import {KnowledgeComponent} from './knowledge/knowledge.component';
import {KnowledgeRoutes} from './knowledge/knowledge.routes';

import {WorkersComponent} from './workers/workers.component';
import {WorkersRoutes} from './workers/workers.routes'

import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuard } from '../../services/admin-auth-guard.service';

export const PagesRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'frontDesk',
        component: FrontDeskComponent,
        children: frontDeskRoutes,
    },
    {
        path: 'workers',
        component: WorkersComponent,
        children: WorkersRoutes,
    }
    ,
    {
        path: 'knowledge',
        component: KnowledgeComponent,
        children: KnowledgeRoutes
    },
   
    {
        path: 'calls',
        component: CallsComponent,
        children: CallsRoutes,
    }
   
];