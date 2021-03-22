import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent implements OnInit {
    highcharts = Highcharts;
    chartOptions = {
       chart : {
          plotBorderWidth: null,
          plotShadow: false
       },
       title : {
          text: 'Current Air Quality Split'
       },
       tooltip : {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
       },
       plotOptions : {
          pie: {
             shadow: false,
             center: ['50%', '50%'],
             size:'60%',
             innerSize: '40%'
          }
       },
       series : [{
          type: 'pie',
          name: 'Browser share',
          data: [
             ['CO2',   45.0],
             ['SO2',   26.8],
             ['NO2',   45.0],
             ['O3',    8.5],
             ['PM10',  5.9],
             ['PM2.5', 1.0]
          ]
       }]
    };

    ngOnInit(): void {
      //chartOptions.series.data = ...
    }
 }
