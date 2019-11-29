import {
    Component, Input, Output, EventEmitter,
    trigger, state, style, transition, animate,ViewChild
} from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'save-changes-panel',
    templateUrl: 'save-changes-panel.component.html',
    styleUrls:['./save-changes-panel.component.css'],
    animations: [
        trigger('tableState', [
            transition(
                ':enter', [
                    style({ height: 0 }),
                    animate('300ms', style({ height: '*' }))
                ]
            ),
            transition(
                ':leave', [
                    style({ height: '*' }),
                    animate('200ms', style({ height: 0 }))
                ]
            )
        ])
    ],

})

export class SaveChangesPanelComponent {
    @Output() yesNoAnswer = new EventEmitter();
}