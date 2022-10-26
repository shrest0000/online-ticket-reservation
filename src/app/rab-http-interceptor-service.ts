import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RabUserDetailsService } from './auth/rab-user-details.service';


@Injectable({
    providedIn: 'root'
})
export class RabHttpInterceptorService implements HttpInterceptor{
    constructor(
        private _rabUserDetailsService: RabUserDetailsService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token!: string;
    this._rabUserDetailsService.getUserJwt()
        .pipe(take(1))
        .subscribe(userDetails => {
            token = userDetails;
        })
    let cloneRequest: HttpRequest<any> = request.clone();
    if (token){
        let headerWithToken = this._rabUserDetailsService.addTokenToHttpHeader(request.headers);
        cloneRequest = request.clone({headers: headerWithToken});
    }
    return next.handle(cloneRequest);;
  }

}
