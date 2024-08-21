import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public zoomLevel: number = 18;
  public currentCenter: LngLat = new LngLat(-66.820668, 10.483112);

  constructor() {}

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('El divMap no está definido');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  //Método que escucha los eventos del mapa (cuando se le hace zoom o se termina de hacer zoom)
  public mapListeners() {
    if (!this.map) throw new Error('Mapa no inicializado');

    this.map.on('zoom', (ev) => {
      this.zoomLevel = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() > 18) {
        this.map!.zoomTo(18);
      }
    });

    this.map.on('move', () => {
      const { lng, lat } = this.map!.getCenter();
      this.currentCenter = new LngLat(lng, lat);
    });
  }

  //Cuando se le da al boton de -
  public zoomOut() {
    this.map?.zoomOut();
  }

  //Cuando se le da al boton de +
  public zoomIn() {
    this.map?.zoomIn();
  }

  public zoomChanged(value: string) {
    this.zoomLevel = Number(value);
    this.map!.zoomTo(this.zoomLevel);
  }
}
