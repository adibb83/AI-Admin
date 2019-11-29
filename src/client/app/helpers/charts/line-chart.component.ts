import { Component, Input, OnInit } from '@angular/core';

// interface ChartData {
//     values: {data:Array<any>,label:string},
//     labels: Array<any>
// }

@Component({
    moduleId: module.id,
    selector: 'line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
    @Input() data: any;
    // lineChart
    // public lineChartData: Array<any> = [
    //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }//,
    //     // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    //     // { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    // ];
    // public lineChartLabels: Array<any>=[1, 2, 3, 4, 5];
    public lineChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    drawTicks: false,
                    drawBorder: true,
                    drawOnChartArea: false,
                    // lineWidth: 0,
                    // color: 'transparent'
                }
            }],
            yAxes: [{
                display: false
            }]
        }
    };
    public lineChartColors: Array<any> = [
        { // grey
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#f5e1df',
            pointBackgroundColor: '#eac2bd',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#eac2bd'
        }//,
        // { // dark grey
        //     backgroundColor: 'rgba(77,83,96,0.2)',
        //     borderColor: 'rgba(77,83,96,1)',
        //     pointBackgroundColor: 'rgba(77,83,96,1)',
        //     pointBorderColor: '#fff',
        //     pointHoverBackgroundColor: '#fff',
        //     pointHoverBorderColor: 'rgba(77,83,96,1)'
        // },
        // { // grey
        //     backgroundColor: 'rgba(148,159,177,0.2)',
        //     borderColor: 'rgba(148,159,177,1)',
        //     pointBackgroundColor: 'rgba(148,159,177,1)',
        //     pointBorderColor: '#fff',
        //     pointHoverBackgroundColor: '#fff',
        //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        // }
    ];
    public lineChartLegend: boolean = false;
    public lineChartType: string = 'line';

    // public randomize(): void {
    //     let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    //     for (let i = 0; i < this.lineChartData.length; i++) {
    //         _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
    //         for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //             _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //         }
    //     }
    //     this.lineChartData = _lineChartData;
    // }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    ngOnInit() {
        // console.log(this.data)
    }
}