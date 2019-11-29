import { Component, OnInit } from '@angular/core';
import { CallsService } from '../../../../services/calls.service';
import { GlobalParamsService } from '../../../../services/globalParams.service';

interface ChartData {
    lineChartData: Array<{ data: Array<number>, label: string }>,
    lineChartLabels: Array<string>
}

// interface Call {
//     duration: number,
//     endTime: string
// }

interface CallLogSearch {
    timeRange: any
    companyId: string
}


@Component({
    moduleId: module.id,
    selector: 'call-log',
    templateUrl: 'call-log.component.html',
    styleUrls: ['./call-log.component.css']
})

export class CallLogComponent implements OnInit {
    private chartData: ChartData;
    private selectedDateValue: Object;
    private callLog: any = {};
    private searchParams: CallLogSearch;
    private dates = [
        { value: { fromDate: new Date().getTime(), toDate: new Date().getTime() }, viewValue: 'Today'},
        { value: { fromDate: new Date().getTime(), toDate: new Date().getTime() }, viewValue: 'Yesterday' },
        { value: { fromDate: new Date().getTime(), toDate: new Date().getTime() }, viewValue: 'This Week' },
        { value: { fromDate: new Date().getTime(), toDate: new Date().getTime() }, viewValue: 'Last Week' }
    ];

    constructor(private _callsService: CallsService, private _globalParamsService: GlobalParamsService) { }

    ngOnInit() {
        this.searchParams = { timeRange: this.dates[0].value, companyId: '0' }

        this._callsService.load(this.searchParams).subscribe((res: any) => {
            this.callLog = this.extractData(JSON.parse(res['_body']));

            this.chartData = {
                lineChartData: [{ data: this.callLog.calls.map((call: any) => call.duration), label: 'Duration in sec' }],
                lineChartLabels: this.callLog.calls.map((call: any) => call.endTime.toLocaleTimeString("en-us"))
            }
            console.log(this.callLog.calls);
        }
            ,
            (error: any) => {
                console.log(error);

            });

    }


    private extractData(res: any) {
        var data = res || [];
        data.calls.forEach((d: any) => {
            d.startTime = new Date(d.startTime);
            d.endTime = new Date(d.endTime);
        });
        return data;
    }

}
