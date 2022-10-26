import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Params, Router, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { RabUserDetailsService } from './rab-user-details.service';

@Injectable({
  providedIn: 'root'
})
export class RabAuthGuardService implements CanActivate, OnDestroy {

  pathQueryParams!: Params;

  private _destroy: Subject<boolean> =  new Subject<boolean>();
  private _isLoggedIn!: boolean;

  constructor(
    private _rabUserDetailsService: RabUserDetailsService,
    private _router: Router
    ) {
    }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    // let currentPath = activatedRouteSnapshot.routeConfig?.path;

    // If user is logged in and user can access route url, return true else return false.
    // If user is not logged in, navigate to login path.
    // let canAccess: boolean = false;
    // if (this._isLoggedIn === true && currentPath){
    //   this._rabUserDetailsService.canAccessUrl(currentPath)
    //   .pipe(take(1))
    //   .subscribe((val) => {
    //     canAccess = val;
    //   });
    //   if(canAccess === false){
    //     window.alert(`Access to ${currentPath} url is not permitted.`);
    //   }
    //   return canAccess;
    // }else {

    //   this._router.navigate(['login']);
    //   return false;
    // }
    this._rabUserDetailsService.getUserJwt().pipe(take(1)).subscribe({
      next: (jwt) => {
        this._isLoggedIn = (jwt) ? true : false;
        if (!this._isLoggedIn) this._router.navigateByUrl('login');
      }
    })
    return this._isLoggedIn;
  }
  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.unsubscribe();
  }
}
