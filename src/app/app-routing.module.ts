import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RabAuthGuardService } from './auth/rab-auth-guard.service';
import { RabAuthService } from './auth/rab-auth.service';
import { OmtrComponent } from './omtr/omtr.component';
import { PageNotFoundComponent } from './omtr/page-not-found/page-not-found.component';
import { DashboardComponent } from './rab-dashboard/dashboard/dashboard.component';
import { LoginComponent } from './rab-login/login/login.component';


// Lazy load module for performance and guard the routing path by implementing authguard
// const routes: Routes = [
//   { path: 'reservation', loadChildren: () => import('./rab-reservation/rab-reservation.module').then(m => m.RabReservationModule), canActivate: [RabAuthService]},
//  { path: 'payment', loadChildren: () => import('./rab-payment/rab-payment.module').then(m => m.RabPaymentModule), canActivate: [RabAuthService] },
//   { path: 'login', component: LoginComponent }
// ];

const routes: Routes = [
  {path: 'omtr', component: OmtrComponent, canActivate: [RabAuthGuardService], children: [
    {
      path: 'reservation',
      loadChildren: () => import('./rab-reservation/rab-reservation.module').then(m => m.RabReservationModule),
       pathMatch: 'full'
    },
    {
      path: 'payment',
      loadChildren: () => import('./rab-payment/rab-payment.module').then(m => m.RabPaymentModule),
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: DashboardComponent,
      pathMatch: 'full'
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ]},
  { path: 'login', component: LoginComponent },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
