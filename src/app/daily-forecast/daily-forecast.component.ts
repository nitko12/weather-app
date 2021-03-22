import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { City } from '../models/city.model';
import { DailyData } from '../models/daily-data.model';
import { DailyTemp } from '../models/daily-temp.model';
import { Location } from '../models/location.model';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.css'],
})
export class DailyForecastComponent implements OnInit {
  name: string = '';
  location: City;
  weatherData: DailyData[] = [];

  icon: string;

  minTemp: number;
  maxTemp: number;

  canvas: any;
  ctx: any;
  dailyTempChart: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.location = new City();
  }

  setValue() {
    this.weatherService
      .getDailyWeatherByCityName(this.name)
      .subscribe((res: any) => {
        console.log(res);
        //this.renderLineChart(res.forecast.forecastday);

        this.location.date = new Date(
          res.location.localtime_epoch * 1000
        ).toDateString();
        this.location.localTime = new Date(
          res.location.localtime
        ).toLocaleTimeString();
        this.location.name = res.location.name;

        this.renderLineChart(res.forecast.forecastday[0] as DailyData);

        this.icon = res.current.condition.icon;

        console.log(res.forecast.forecastday[0]);
        //this.minTemp = res.forecast.forecastday[0].mintemp_c;
        // this.maxTemp = ;

        // console.log(res.forecast.forecastday[0]);

        // TODO pripremiti podatke pomoću city, daily-data i daily-temp.model.ts u src/app/models
        // Pozvati renderLineChart() funkciju za današnji dan
      });
  }

  renderLineChart(data: DailyData) {
    // Pomoćne varijable za spremanje podataka o satu i temperaturi
    let hourData: string[] = (data as any).hour.map((x) =>
      new Date(x.time).toLocaleTimeString()
    );
    let tempData: number[] = (data as any).hour.map((x) => x.temp_c);

    if (this.dailyTempChart) {
      this.dailyTempChart.destroy();
    }

    let options: any = {
      legend: {
        display: false,
      },
      responsive: false,
      maintainAspectRatio: true,
      display: true,
      fill: false,
      scales: {
        xAxes: [
          {
            ticks: {
              fontSize: 12,
              fontFamily: 'Verdana',
              fontColor: 'grey',
              fontStyle: 'normal',
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              suggestedMax: Math.max(...tempData) + 5,
              display: false,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };
    this.canvas = document.getElementById('tempChart');
    this.ctx = this.canvas.getContext('2d');

    this.dailyTempChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: hourData,
        datasets: [
          {
            label: 'C°',
            data: tempData,
            borderColor: 'rgba(255,204,0,1)',
            backgroundColor: 'rgba(255,245,204,1)',
            borderWidth: 3,
            pointRadius: 0,
          },
        ],
      },
      options: options,
      plugins: [
        {
          afterDatasetsDraw: function (chart) {
            var ctx = chart.ctx;
            chart.data.datasets.forEach(function (dataset, index) {
              var datasetMeta = chart.getDatasetMeta(index);
              if (datasetMeta.hidden) return;
              datasetMeta.data.forEach(function (point, index) {
                var value = dataset.data[index],
                  x = point.getCenterPoint().x,
                  y = point.getCenterPoint().y,
                  radius = point._model.radius,
                  fontSize = 14,
                  fontFamily = 'Verdana',
                  fontColor = 'grey',
                  fontStyle = 'normal';
                ctx.save();
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.font = fontStyle + ' ' + fontSize + 'px' + ' ' + fontFamily;
                ctx.fillStyle = fontColor;
                ctx.fillText(value, x, y - radius - fontSize);
                ctx.restore();
              });
            });
          },
        },
      ],
    });
  }
}
