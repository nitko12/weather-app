import { CurrentWeatherData } from './../models/current-weather-data.model';
import { AstronomyData } from './../models/astronomy-data.model';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Accessory } from '../models/accessory.model';

@Component({
  selector: 'app-current-weather-data',
  templateUrl: './current-weather-data.component.html',
  styleUrls: ['./current-weather-data.component.css']
})
export class CurrentWeatherDataComponent implements OnInit {

  currentWeather: CurrentWeatherData;
  airQualityAndWeather: CurrentWeatherData;
  astronomy: AstronomyData;
  accessories: Accessory[] = [];

  constructor( private weatherService: WeatherService ) { }

  ngOnInit(): void {
    this.getCurrentWeatherData();
    this.getWeatherAndAirQuality();
    this.getAstronomyData();
  }

  getCurrentWeatherData() {
    this.weatherService.getCurrentWeatherData().subscribe((response) => {
      this.currentWeather = response.body,
        console.log(this.currentWeather)
    }
    )
  }

  getAstronomyData() {
    this.weatherService.getAstronomy().subscribe((response) => {
      this.astronomy = response.body,
        console.log(this.astronomy)
    }
    )
  }

  getWeatherAndAirQuality() {
    this.weatherService.getWeatherAndAirQuality().subscribe((response) => {
      this.airQualityAndWeather = response.body,
        console.log(this.airQualityAndWeather)
    }
    )
  }

}
