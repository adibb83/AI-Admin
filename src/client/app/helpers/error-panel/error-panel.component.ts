import {
    Component, Input, Output, EventEmitter,
    trigger, state, style, transition, animate
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'error',
    templateUrl: 'error-panel.component.html',
    animations: [
        trigger('tableState', [
            transition(
                ':enter', [
                    style({ height: 0 }),
                    animate('500ms', style({ height: '*' }))
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

export class ErrorPanelComponent {
    @Input() error: Object;
    @Output() clear = new EventEmitter();
}