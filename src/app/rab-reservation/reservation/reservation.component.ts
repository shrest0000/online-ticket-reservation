import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ReservedMovieInitails } from 'src/app/rab-payment/payment/payment.component';
import { ReservationEnums } from 'src/app/reservation-enums';
import { ReservationData } from './reservation-data';
import { ReservedMovie } from './ReservedMovie';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  @Input() dataRecords: ReservationData[] = [];

  keys: string[] = new Array<string>;

  isMovieSelected: Boolean = false;
  selectedMovie!: ReservationData;

  reserveQty: number = 1;
  validReservation: boolean = true;

  constructor(private _http: HttpClient, private _router: Router) { }

  private _getMovies() {
    this._http.get<ReservationData[]>(ReservationEnums.GETMOVIESURL).pipe(take(1)).subscribe({
      next: (data)=> {
        this.dataRecords = data;
        let rawkeys = Object.keys(data[0]);
        this.keys = rawkeys.map((element) => {return element.toUpperCase()})
      }
    })
  }


  onReserveMovie(reserveMovie: ReservationData):void{
    this.selectedMovie = reserveMovie;
    this.isMovieSelected = true
  }

  onReservation(){
    this.validReservation = (this.reserveQty >=1 && this.reserveQty <= this.selectedMovie.reservationQty) ? true : false ;

    if(this.validReservation){
      let reservationId: string = this.generateReservationId();
      if(this.selectedMovie){
        let reservedMovie: ReservedMovie = ReservedMovieInitails;
        reservedMovie = {
          movie : this.selectedMovie.movie,
          showTime : this.selectedMovie.showTime,
          price : this.selectedMovie.price,
          reservationId : reservationId,
          reservedQty : this.reserveQty
        }
        this._http.post(ReservationEnums.RESERVATIONURL,reservedMovie).pipe(take(1)).subscribe({
          next: () => {}
        });
      this._router.navigate([ReservationEnums.ROUTEPAYMENT], {queryParams: {reservationId: reservationId}});
      }
    }
  }

  generateReservationId(): string{
    return '_' + Math.random().toString(36).substring(2, 9);
  }

   ngOnInit(): void {
    this._getMovies();
  }
}
