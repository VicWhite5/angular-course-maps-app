import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {

  @Input()
  public lngLat?: [number, number];

  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;

  constructor() { }

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('El divMap no está definido');
    if (!this.lngLat) throw new Error('El atributo lngLat es requerido');
    console.log(this.lngLat);
    
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    const marker: Marker = new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map);
    
    
  }
}
