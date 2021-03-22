import { Component, OnInit } from '@angular/core';
import { Overlay } from 'ol';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import Vector from 'ol/layer/Vector';
import Map from 'ol/Map';
import * as olProj from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import View from 'ol/View';
import { WeatherAlertType, weatherAlertTypes } from '../models/weather-alert-types.model';
import { WeatherAlert } from '../models/weather-alert.model';
import { WeatherAlertService } from '../services/weather-alert.service';

@Component({
  selector: 'app-weather-alerts',
  templateUrl: './weather-alerts.component.html',
  styleUrls: ['./weather-alerts.component.css']
})
export class WeatherAlertsComponent implements OnInit {
  map: any;
  overlay: Overlay;
  
  weatherAlert: WeatherAlert;
  weatherAlertType: WeatherAlertType;

  weatherAlertTypes = weatherAlertTypes;

  constructor(private weatherAlertService: WeatherAlertService) { }

  ngOnInit() {

    this.overlay = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.map = new Map({
      target: 'weather_map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        center: olProj.fromLonLat([15.966568, 45.815399]),
        zoom: 8
      }),
      overlays: [
        this.overlay
      ]
    });

    this.addMarker();

    this.map.on('click', (evt) => {
      var feature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        var coordinates = feature.getGeometry().getCoordinates();
        this.overlay.setPosition(coordinates);
      } else {
        this.overlay.setPosition(undefined);;
      }
    })

    this.weatherAlertService.getLastWeatherAlertForCity("Split").subscribe((response) => {
      this.weatherAlert = response.body,
      this.weatherAlertType = this.weatherAlertTypes.find(x => x.weatherAlertTypeId === this.weatherAlert.weatherAlertTypeId);
    });
  }

  addMarker() {
    var vectorLayer = new Vector({
      source: new VectorSource({
        features: [new Feature({
          geometry: new Point(olProj.transform([15.966568, 45.815399], 'EPSG:4326', 'EPSG:3857')),
          customText: "Some data",
        })]
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          src: "assets/images/alert.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }
}