import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public currentCenter: LngLat = new LngLat(-66.820668, 10.483112);

  public markers: MarkerAndColor[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('El divMap no está definido');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.loadFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // const marker: Marker = new Marker({
    //   // color: '#3887be',
    //   // element: markerHtml,
    // })
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);
  }

  public createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  public addMarker(lngLat: LngLat, color: string = '#3887be') {
    if (!this.map) return;

    const newMarker: Marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map!);

    //Cuando creo un marcador, le agregamos este listener para ver cuando se mueve
    newMarker.on('dragend', () => {
      this.saveToLocalStorage();
    });

    this.markers.push({ color: color, marker: newMarker });

    this.saveToLocalStorage();
  }

  public removeMarker(index: number) {
    this.markers[index].marker.remove(); //Removemos el marker del mapa
    this.markers.splice(index, 1); //Removemos el marker del arreglo

    this.saveToLocalStorage(); //Actualizamos el storage
  }

  public flyTo(marker: Marker) {
    if (!this.map) return;

    this.map.flyTo({
      zoom: 16,
      center: marker.getLngLat(),
      essential: true,
    });
  }

  public saveToLocalStorage() {
    //Hacemos esta transformación para quedarnos solamente con la información que necesitamos
    const plainMarkers: PlainMarker[] = this.markers.map(
      ({ color, marker }) => {
        return {
          color: color,
          lngLat: marker.getLngLat().toArray(),
        };
      }
    );

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  public loadFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers');
    if (!plainMarkersString) return;

    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //!Ojo pelao con esto

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      this.addMarker(new LngLat(lng, lat), color);
    });
  }
}
