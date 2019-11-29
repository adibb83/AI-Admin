import { Component, OnInit, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'dynamic-view',
    styleUrls: ['./dynamic-view.component.css'],
    templateUrl: './dynamic-view.component.html',
})
export class DynamicViewComponent {
    @Input() header: string;
    @Input() lastUpdate: string;
    @Input() body: string;
}
