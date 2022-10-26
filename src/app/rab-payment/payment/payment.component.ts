import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ReservationData } from 'src/app/rab-reservation/reservation/reservation-data';
import { ReservedMovie } from 'src/app/rab-reservation/reservation/ReservedMovie';
import { ReservationEnums } from 'src/app/reservation-enums';

export const ReservedMovieInitails = {
  movie : "",
  showTime : "",
  price : 0,
  reservationId : "",
  reservedQty : 0
}

export const PayedMovieInitails = {
  movie : "",
  price : 0,
  reservedQty : 0,
  reservationId: "",
  paymentId : "",
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  reservationId: string = '';
  isReservationIdEnable: boolean = false;
  searchedReservation!: ReservationData;
  reservedMovie: ReservedMovie = ReservedMovieInitails;

  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.reservationId = this._route.snapshot.queryParams['reservationId'];
    this.getReservationById().pipe(take(1)).subscribe({
      next: (data) =>  {
        this.reservedMovie = (data)? data : ReservedMovieInitails;
      }
    });
  }

  getReservationById(): Observable<ReservedMovie> {
    return this._http.get<ReservedMovie>(ReservationEnums.GETRESERVATIONBYID+this.reservationId)
  }

  editReservationId():void {
    this.isReservationIdEnable = true;
  }

  searchByReservationId():void {
    this.getReservationById().pipe(take(1)).subscribe({
      next: (data) =>  {
        this.reservedMovie = (data)? data : ReservedMovieInitails;
      }
    });

  }

  onPayment() {
    let payDetails = PayedMovieInitails;
    payDetails.movie = this.reservedMovie.movie;
    payDetails.price = this.reservedMovie.price;
    payDetails.reservedQty = this.reservedMovie.reservedQty;
    payDetails.reservationId = this.reservedMovie.reservationId
    payDetails.paymentId = this.generateReservationId();
    this._http.post(ReservationEnums.PAYMENTURL, payDetails).pipe(take(1)).subscribe({next: () => {
      this.reservedMovie = ReservedMovieInitails
    }})
    this._router.navigateByUrl(ReservationEnums.ROUTEDASHBOARD);
  }

  generateReservationId(): string{
    return '_' + Math.random().toString(36).substring(2, 9);
  }

}
