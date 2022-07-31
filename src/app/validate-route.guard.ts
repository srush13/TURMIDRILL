import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { GeneralService } from './services/general.service';
import { Observable } from 'rxjs';
import { LoginAuthService } from './services/login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateRouteGuard implements CanActivate {
  constructor(
    private login: LoginAuthService,
     private router: Router,
     private general:GeneralService) { 
       
     }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let token = this.general.getToken();
      if(!token){
        return true;
      }
      else{
        this.login.logout();
      }
  }
  
}
