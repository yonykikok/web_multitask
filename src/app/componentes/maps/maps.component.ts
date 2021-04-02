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



