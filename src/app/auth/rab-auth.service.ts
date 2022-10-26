import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RabAuthService{

  constructor(
    private _httpClient: HttpClient) { }

    authenticate(username: string, password: string, navigatePath: string):Observable<HttpResponse<any>>{
      return this._httpClient.post<HttpResponse<any>>(navigatePath, {username: username, password: password}, {observe: 'response'});
    }
}
