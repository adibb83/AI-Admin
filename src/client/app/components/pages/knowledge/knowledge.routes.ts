import { Routes } from '@angular/router';
import { Knowledge_baseComponent } from './knowledge_base/index';
import { KnowledgeEntityComponent } from './knowledge_entity/index';
import { ConfirmDeactivateKnowledgeEntity } from '../../../confirmDeactivateGuard/confirmDeactivateKnowledgeInfo';


export const KnowledgeRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'knowledge_base'
    },
     {
        path: 'knowledge_base',
        component: Knowledge_baseComponent
    },
    {
        path: 'knowledgeInfo',
        component: KnowledgeEntityComponent,
        canDeactivate: [ConfirmDeactivateKnowledgeEntity]
    },
];