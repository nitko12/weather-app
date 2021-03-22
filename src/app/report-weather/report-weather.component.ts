import { Component, OnInit } from '@angular/core';
import {
  WeatherAlertType,
  weatherAlertTypes,
} from 'src/app/models/weather-alert-types.model';
import { WeatherAlert } from 'src/app/models/weather-alert.model';

@Component({
  selector: 'app-report-weather',
  templateUrl: './report-weather.component.html',
  styleUrls: ['./report-weather.component.css'],
})
export class ReportWeatherComponent implements OnInit {
  selectedWeatherAlertType: WeatherAlertType;
  selectedWeatherAlert: WeatherAlert = new WeatherAlert();

  weatherAlertTypes = weatherAlertTypes;

  constructor() {}

  ngOnInit(): void {}

  submit() {
    //console.log(this.selectedWeatherAlert);
  }
}
