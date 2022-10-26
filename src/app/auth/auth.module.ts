import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RabAuthService } from './rab-auth.service';
import { RabAuthGuardService } from './rab-auth-guard.service';
import { RabUserDetailsService } from './rab-user-details.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    RabAuthService, RabAuthGuardService, RabUserDetailsService
  ]
})
export class AuthModule { }
