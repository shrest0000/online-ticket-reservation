import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RabUserDetailsService {
  private _userAuthDetails = new BehaviorSubject<any>({});
  private _userJWT = new BehaviorSubject<any>(null);

  constructor() {}

  storeUserAuthDetails(userDetails: any, jwt: string):void {
    this._userAuthDetails.next(userDetails);
    this._userJWT.next(jwt);
  }

  getUserAuthDetails(): Observable<any>{
    return this._userAuthDetails.asObservable();
  }

  getUserJwt(): Observable<string>{
    return this._userJWT.asObservable()
  }

  hasRole(role: string): Observable<boolean>{
    return  this._userAuthDetails.pipe(
      map(
        (element: any) => {
          return element.roles.indexOf(role) >= 0;
        }
      ))
  };

  hasCapability(capability: string): Observable<boolean>{
    return  this._userAuthDetails.pipe(
      map(
        (element: any) => {
          return element.capabilities.indexOf(capability) >= 0;
        }
      ))
  };

  canAccessUrl(url:string): Observable<boolean>{
    return  this._userAuthDetails.pipe(
      map(
        (element: any) => {
          return element.accessibleUrls.indexOf(url) >= 0;
        }
      ))
  };

  clearUserDetails(){
    this._userAuthDetails.next({});
  }

  addTokenToHttpHeader(header: HttpHeaders): HttpHeaders{
    let token!: string;
    this.getUserJwt().pipe(take(1)).subscribe(userDetails => { token = userDetails });
    if(token){
      token  = 'Bearer ' + token;
      header = header.set('Authorization', token);
      return header;
    } else{
      return header;
    }
  }

  ngOnDestroy() {
    this._userAuthDetails.complete();
    this._userJWT.complete();
  }
}
