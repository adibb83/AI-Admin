import { Injectable, Inject } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { KnowledgeEntityComponent } from '../components/pages/knowledge/knowledge_entity/knowledge_entity.component';



@Injectable()
export class ConfirmDeactivateKnowledgeEntity implements CanDeactivate<KnowledgeEntityComponent> {

    canDeactivate(target: KnowledgeEntityComponent) {
        if (target.isChanges) {
            target.showSaveBanner = true;
            return false;
        }
        return true;
    }
}