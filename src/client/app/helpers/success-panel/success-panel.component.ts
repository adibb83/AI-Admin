import {
    Component, Input, Output, EventEmitter,
    trigger, state, style, transition, animate
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'success',
    templateUrl: 'success-panel.component.html',
    animations: [
        trigger('tableState', [
            transition(
                ':enter', [
                    style({ height: 0 }),
                    animate('200ms', style({ height: '*' }))
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

export class SuccessPanelComponent {
    @Input() success: Object;
    @Output() clear = new EventEmitter();
}