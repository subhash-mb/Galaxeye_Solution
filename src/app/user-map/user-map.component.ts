import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-draw';

// turf library to do the calculation - calculation intersection
import * as turf from '@turf/turf';

import { JsondataService } from '../services/jsondata.service';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css'],
})
export class UserMapComponent implements OnInit {

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  map!: L.Map;
  polygon: any;
  jsondata: any;
  geoJSON: any;
  showInvalidMessage: boolean = false;
  checkGeoJson: boolean = false;


  constructor(private jsondataService: JsondataService) {}

  ngOnInit(): void {
    this.initMap();
    this.getJSONData();
  }

  initMap(): void {
    // Intial View of the map
    this.map = L.map(this.mapContainer.nativeElement).setView([12.9716, 77.5946], 10 );

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Initialize the Draw control
    const drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#e1e100',
            message: "<strong>Oh... you can't draw that! </strong>",
          },
          shapeOptions: {
            color: 'blue',
          },
        },
        rectangle: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });
    this.map.addControl(drawControl);

    // To get the Coordinates of the Selected AOI
    this.map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      this.geoJSON = layer.toGeoJSON();
      console.log('Selected area coordinates', this.geoJSON);

      this.showInvalidMessage = false;
      this.calculateIntersections(this.geoJSON);
    });

  }

  // To Load the Geojson file from karnataka.geojson file
  getJSONData() {
    this.jsondataService.getJSON().subscribe((data) => {
      this.jsondata = data;
      console.log(' Json data from file : ' + this.jsondata.features);
      this.jsondata.features.forEach((obj: any, index: any) => {
        console.log(`Details for object at index ${index}:`);
        console.log('Each object', obj);
      });
    });
  }

  // Calculate Intersection Area using turf Library
  calculateIntersections(selectedData: any) {
    const intersectingTiles = [];

    for (const tile of this.jsondata.features) {
      const tilePolygon = turf.polygon([tile.geometry.coordinates[0]]);
      const intersection = turf.intersect(selectedData, tilePolygon);

      if (intersection) {
        intersectingTiles.push(tile);

        // Create a Leaflet polygon layer for the intersecting tile
        const leafletLayer = L.geoJSON(tile.geometry, {
          style: {
            color: 'red', // Add color of the intersecting tile
            fillOpacity: 0.4,
          },
        });

        // Add the layer to the map and the array
        leafletLayer.addTo(this.map);
        intersectingTiles.push(leafletLayer);
      }
    }

    // Show a success popup message after intersection calculations are completed.
    const popupMessage = 'Intersection calculations are complete!';
    const mapCenter = this.map.getCenter(); // Get the current map center
    L.popup()
      .setLatLng(mapCenter) // Use the current map center as the popup position
      .setContent(popupMessage)
      .openOn(this.map);
  }

clearAll() {
  // Clear the drawn items layer and the Intersected area
  this.map.eachLayer((layer) => {
    if (layer instanceof L.FeatureGroup) {
      this.map.removeLayer(layer);
    }
  });
}

}
