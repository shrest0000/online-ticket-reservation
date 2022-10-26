import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RabUserDetailsService } from '../auth/rab-user-details.service';

@Component({
  selector: 'app-omtr',
  templateUrl: './omtr.component.html',
  styleUrls: ['./omtr.component.scss']
})
export class OmtrComponent implements OnInit {

  constructor(
    private _rabUserDetailsService: RabUserDetailsService,
    private _router: Router
    ) { }

  ngOnInit(): void {
  }

  onLogout(){
    this._rabUserDetailsService.clearUserDetails();
    this._router.navigateByUrl('login');

  }

}
