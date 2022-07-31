import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  public loginCred = new Subject<any>()
  public loginCheckData = new Subject<any>()
  constructor(
    private general: GeneralService,
    private router: Router
  ) {
   }

  loginData() {
    var data = localStorage.getItem('turmiDrill') ? this.general.decrypt(localStorage.getItem('turmiDrill')) : null
    if ((data != null || data != undefined) && data) {
      var a = {
        status: true,
        data: data
      }
      return a
    }
    else {
      var a = {
        status: false,
        data: data
      }
      return a
    }
  }

  login(data) {
    let storeData = this.general.encrypt(data)
    localStorage.setItem('turmiDrill', storeData)
    return true
  }

  logout() {
    // this.dialog.closeAll()
    this.loginCheckData.next(false);
    localStorage.clear()
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
