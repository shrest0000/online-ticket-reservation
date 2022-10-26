import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { RabAuthService } from 'src/app/auth/rab-auth.service';
import { ReservationEnums } from 'src/app/reservation-enums';
import { RabUserDetailsService } from 'src/app/auth/rab-user-details.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  loginError!: string;
  private _redirectPath: string = '/omtr';

  loginFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('',  [
      Validators.required,
    ])
  });

  username = this.loginFormGroup.get('username');
  password = this.loginFormGroup.get('password');


  constructor(
    private _router: Router,
    private _rabAuthService: RabAuthService,
    private _rabUserDetailsService: RabUserDetailsService,
    ) { }

  ngOnInit(): void {
  }

  onLogin() {
    this._rabAuthService.authenticate(this.username?.value, this.password?.value, ReservationEnums.BACKENDAUTHURL)
      .pipe(take(1)).subscribe({
        next:  (data) => {
          this._rabUserDetailsService.storeUserAuthDetails(data.body.user, data.body.jwt);
          this._router.navigateByUrl(this._redirectPath);
        },
        error: (err) =>{
          this.loginError = "Invalid credentials";
        }
      }
    )
  }
}

