import {Injectable, Inject} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import {CompanyComponent} from '../components/pages/frontDesk/company/company.component';



@Injectable()
export class ConfirmDeactivateCompany implements CanDeactivate<CompanyComponent> {
    
    canDeactivate(target: CompanyComponent) {
        if (target.isChanges) {
            target.showSaveBanner = true;
            return false;
        }
        return true;
    }

    //  openDialog():true{
    //     let dialogRef = this.dialog.open(YesNoDialog,
    //         {
    //             height: '200px',
    //             width: '400px'
    //         }
    //     );

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result != 'Cancel') {
    //             return true;
    //         }
    //         else {
    //            return true;
    //         }
    //     });
        
    // }

}