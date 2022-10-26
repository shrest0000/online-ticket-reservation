import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { RabPaymentRoutingModule } from './rab-payment-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    RabPaymentRoutingModule,
    FormsModule
  ]
})
export class RabPaymentModule { }
