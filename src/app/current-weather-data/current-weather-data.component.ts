import { CurrentWeatherData } from './../models/current-weather-data.model';
import { AstronomyData } from './../models/astronomy-data.model';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Accessory } from '../models/accessory.model';

@Component({
  selector: 'app-current-weather-data',
  templateUrl: './current-weather-data.component.html',
  styleUrls: ['./current-weather-data.component.css'],
})
export class CurrentWeatherDataComponent implements OnInit {
  currentWeather: CurrentWeatherData;
  airQualityAndWeather: CurrentWeatherData;
  weatherAlerts: any; // TODO define interface
  astronomy: AstronomyData;
  accessories: Accessory[] = [];
  currentLocation: { latitude: number; longitude: number };
  currentLocationString: string;

  locationState: 'ask' | 'loading' | 'loaded' | 'error';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getCurrentLocation(
      (latitude, longitude) => {
        this.currentLocation = { latitude, longitude };
        this.currentLocationString = `${latitude},${longitude}`;

        this.locationState = 'loaded';

        this.getCurrentWeatherData();
        this.getWeatherAndAirQuality();
        this.getAstronomyData();
        this.getWeatherAlerts();
      },
      () => {
        this.locationState = 'error';
        // TODO prezentirati input box, etc -mybe na temelju ip adrese sa servera
      }
    );
  }

  getCurrentWeatherData() {
    this.weatherService
      .getCurrentWeatherData(this.currentLocationString)
      .subscribe((response) => {
        (this.currentWeather = response.body), console.log(this.currentWeather);
      });
  }

  getAstronomyData() {
    this.weatherService
      .getAstronomy(this.currentLocationString)
      .subscribe((response) => {
        (this.astronomy = response.body), console.log(this.astronomy);
      });
  }

  getWeatherAndAirQuality() {
    this.weatherService
      .getWeatherAndAirQuality(this.currentLocationString)
      .subscribe((response) => {
        this.airQualityAndWeather = response.body;
        //console.log(this.airQualityAndWeather);
      });
  }

  getWeatherAlerts() {
    this.weatherService
      .getWeatherAlerts(this.currentLocationString)
      .subscribe((response) => {
        this.weatherAlerts = response.body;
        //console.log(this.airQualityAndWeather);
      });
  }

  getCurrentLocation(
    sucess: (latitude: number, longitude: number) => void,
    fail: (reason: 'Not Supported' | 'Error') => void
  ) {
    if (!navigator.geolocation) {
      fail('Not Supported');
    } else {
      this.locationState = 'ask';

      navigator.geolocation.getCurrentPosition(
        (position) => {
          sucess(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fail('Error');
        }
      );
    }
  }
}
