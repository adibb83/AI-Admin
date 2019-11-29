import {Injectable, Inject} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import {WorkerInfoComponent} from '../components/pages/workers/workerInfo/workerInfo.component';



@Injectable()
export class ConfirmDeactivateWorkerInfo implements CanDeactivate<WorkerInfoComponent> {
    
    canDeactivate(target: WorkerInfoComponent) {
         if (target.isChanges) {
            target.showSaveBanner = true;
            return false;
        }
        return true;
    }
}