import { HttpClient } from '@angular/common/http';
import { AfterContentInit, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { take } from 'rxjs';
import { ReservedMovie } from 'src/app/rab-reservation/reservation/ReservedMovie';
import { ReservationEnums } from 'src/app/reservation-enums';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  reservationChart: any;
  paymentChart: any;

  allReservation: ReservedMovie[] = [];
  allReservationMovies: string[] = [];
  allReservationQty: string[] = [];
  allReservationPrice: string[] = [];
  allReservationId: string[] = [];

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.getChartData();
  }

  private _generateReservationChartData(data: ReservedMovie[]) {
    data.forEach((reservation) => {
      this.allReservationMovies.push(reservation.movie);
      this.allReservationQty.push(reservation.reservedQty.toString());
      this.allReservationPrice.push(reservation.price.toString());
      this.allReservationId.push(reservation.reservationId);
    })
  }

  getChartData(){
    this._http.get<ReservedMovie[]>(ReservationEnums.GETALLRESERVATIONS).pipe(take(1)).subscribe({
      next: (data) => {
        this.allReservation = data;
        this._generateReservationChartData(data);
      }
    });
  }

  createChart() {

    this.reservationChart = new Chart("reservation-chart", {
      type: 'bar',
      data:{
        labels:this.allReservationId,
        datasets:[
          {
            label: "Reservation Price",
            data: this.allReservationPrice,
            backgroundColor: 'lightblue'
          }
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Reservation Id',
              color: 'Green',
              font: {
                size: 20
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price',
              color: 'Green',
              font: {
                size: 20
              }
            }
          }
        }
      }
    });
  }
}
