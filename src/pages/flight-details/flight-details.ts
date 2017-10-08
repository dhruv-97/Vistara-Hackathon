import { Component ,OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { FlightData } from '../../providers/flight-data';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
import {FlightHistoryPage} from '../flight-history/flight-history';
declare var google: any;
/*
  Generated class for the FlightDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-flight-details',
  templateUrl: 'flight-details.html',
  providers: [AuthData, FlightData]
})
export class FlightDetailsPage implements OnInit{

  arrivalDate: string;
  departureDate: string;
  flightName: string;
  departue: string;
  arrival: string;
  duration: string;
  arrivalTerminal: string;
  departureTerminal: string;
  id: string;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthData, private flightData: FlightData, public toastCtrl: ToastController) {
    // console.log(navParams.get("res"));
    let ob = navParams.get("res");
    console.log(ob);
    this.id = ob._id;
    this.departureDate = ob.departure_date;
    this.arrivalDate = ob.arrival_date;
    this.flightName = ob.flight_name;
    this.departue = ob.departure;
    this.arrival = ob.arrival;
    this.duration = ob.flight_duration;
    this.arrivalTerminal = ob.arrival_terminal;
    this.departureTerminal = ob.departure_terminal;
  }

     ngOnInit() {
      var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 13.0827, lng: 80.2707}
        });
        directionsDisplay.setMap(map);
        directionsService.route({
          origin: this.departue+" Airport",
          destination: this.arrival+" Airport" ,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            console.log(response,status);
          }
        });
      }

  add() {
      this.flightData.addFlight(this.id).subscribe(res => {
          this.navCtrl.push(FlightHistoryPage);
      },
        err => {
          console.log(err);
          let toast = this.toastCtrl.create({
            message: "Not able to add your flight.",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }),
        () => console.log('Completed')
  }

}
