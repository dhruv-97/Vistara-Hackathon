import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import localStorage from 'localStorage';
import 'rxjs/add/operator/map';


/*
  Generated class for the FlightData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FlightData {

  constructor(public http: Http) {
    // console.log('Hello FlightData Provider');
  }

  searchFlight(flightcode, flightnumber,mydate): Observable<any>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = JSON.stringify({
      "flight_code": flightcode,
      "flight_number": flightnumber,
    });

    // console.log(data);

    return this.http.post(`http://localhost:3000/details/flight`, data, { headers })
      .map(res => res.json())
  }

  addFlight(id):Observable<any>{
    let headers = new Headers();
    let token=localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');
    // console.log(token);
    headers.append('auth-token',token);
    let username = localStorage.getItem('username');
    let data = {
      _id: id,
      username
      
    }
    return this.http.put(`http://localhost:3000/details/flight`, data, { headers })
      .map(res => res.json())
    }
    

    flightHistory():Observable<any>{
    let headers = new Headers();
    let token=localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token',token);
    let username = localStorage.getItem('username');
    return this.http.post(`http://localhost:3000/details/flight`,{username}, { headers })
      .map(res => res.json())
    }

    weather(airport_code):Observable<any>{
    let headers = new Headers();
    let token=localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token',token);

     let data = JSON.stringify({
      "airport": airport_code
    });

    return this.http.post(`http://localhost:3000/details/weather`, data, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
    }

    geoCodeAirport(airport){
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${airport}&key=AIzaSyAa5tWYQIdFInqiBXb6nOtn9yy8olYWFVw`)
      .map(res => res.json())
      .map((res) => {
        return res;
      });
    }

}
