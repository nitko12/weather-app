import { CurrentWeatherData } from '../models/current-weather-data.model';
import { AstronomyData } from '../models/astronomy-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(protected http: HttpClient) {}

  public getCurrentWeatherData(location: string) {
    return this.http.get<CurrentWeatherData>(
      `http://api.weatherapi.com/v1/current.json?key=${environment.apiKey}&q=${location}`,
      { observe: 'response', responseType: 'json' }
    );
  }

  public getWeatherAndAirQuality(location: string) {
    return this.http.get<CurrentWeatherData>(
      `http://api.weatherapi.com/v1/current.json?key=${environment.apiKey}&q=${location}&aqi=yes`,
      { observe: 'response', responseType: 'json' }
    );
  }

  public getAstronomy(location: string) {
    return this.http.get<AstronomyData>(
      `http://api.weatherapi.com/v1/astronomy.json?key=${environment.apiKey}&q=${location}&dt=`,
      { observe: 'response', responseType: 'json' }
    );
  }

  public getDailyWeatherByCityName(location: string) {
    const url: string = `http://api.weatherapi.com/v1/forecast.json?key=${environment.apiKey}&q=${location}&days=3&aqi=no`;

    return this.http.get(url);
  }

  public getWeatherAlerts(location: string) {
    return this.http.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${environment.apiKey}&q=${location}&days=3&aqi=no&alerts=yes`,
      { observe: 'response', responseType: 'json' }
    );
  }
}
