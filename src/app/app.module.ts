import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RabDashboardModule } from './rab-dashboard/rab-dashboard.module';
import { RabHttpInterceptorService } from './rab-http-interceptor-service';
import { RabLoginModule } from './rab-login/rab-login.module';
import { RabPaymentModule } from './rab-payment/rab-payment.module';
import { RabReservationModule } from './rab-reservation/rab-reservation.module';
import { OmtrComponent } from './omtr/omtr.component';
import { PageNotFoundComponent } from './omtr/page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    OmtrComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RabLoginModule,
    HttpClientModule,
    RabPaymentModule,
    RabReservationModule,
    RabDashboardModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RabHttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
