import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from './services/login-auth.service';
import { GeneralService } from './services/general.service';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginData: any
  loginStatus:boolean
  constructor(
    private login: LoginAuthService,
     private router: Router,
     private general:GeneralService) { 
       this.loginData=this.login.loginData().data;
       console.log("this.loginData==",this.loginData)
     }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = this.general.getToken();
    if(token){
      this.login.loginCheckData.next(true);
      return true;
    }
    else{
      this.login.loginCheckData.next(false);
      this.router.navigate(['/login']);
    }
  }
  
}
