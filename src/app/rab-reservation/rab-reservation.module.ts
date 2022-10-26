import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { RabReservationRoutingModule } from './rab-reservation-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ReservationComponent,
  ],
  imports: [
    CommonModule,
    RabReservationRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    ReservationComponent
  ],
  providers: [
  ]
})
export class RabReservationModule { }
