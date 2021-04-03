import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  apiLoaded: Observable<boolean>;

  position={lat: -34.6621179, lng: -58.3660891};
  label={
    color:'white',
    text:'UTN FRA'
  }


  options: google.maps.MapOptions = {
    center: {lat: -34.6621179, lng: -58.3660891},
    zoom: 4
  };

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCOV3fj1vzZs_EJCzn2cSqTlaxV-ckIFCQ', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }


  ngOnInit(): void {

  }

}



