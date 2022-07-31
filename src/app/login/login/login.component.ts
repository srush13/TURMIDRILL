import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoginAuthService } from '../../services/login-auth.service';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router'
import { stringify } from 'querystring';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  partnerLogin: FormGroup;
  customerLogin: FormGroup;
  loginInvalidCust: boolean = false;
  loginInvalidPartner: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  passwordType1: string = 'password';
  passwordIcon1: string = 'visibility_off';
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public general: GeneralService,
    private login: LoginAuthService
  ) { }

  ngOnInit(): void {
    this.partnerLogin = this.fb.group({
      userName: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
    this.customerLogin = this.fb.group({
      userName: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmitPartnerLogin(data) {
    console.log("data==", data)
    var value = {
      email: data.userName,
      password: data.password
    }
    if (this.partnerLogin.valid) {
      try {
        this.api.partnerLogin(value).then((res: any) => {
          console.log("create customer res==", res);
          if (res.status) {
            if (res.isAuthenticated) {
              if (res.token) {
                this.loginInvalidPartner = false;
                localStorage.setItem('token', res.token);
                var start = new Date() as any;
                var end = new Date();
                var date = end.setHours(start.getHours() + 1);
                res.success.timer = date;
                res.success.type = 1;
                if (this.login.login(res.success)) {
                  this.router.navigate(['/dashboard']);
                }
                else {
                  this.loginInvalidPartner = true;
                }
              }
              else {
                this.loginInvalidPartner = true;
              }
            }
            else {
              this.router.navigate(['/verify-otp'], { queryParams: { email: data.userName } });
              
            }
          }
          else {
            this.loginInvalidPartner = true;
          }
        }).catch(err => {
          console.log("error==", err);
        })
      }
      catch (err) {
        console.log("err=", err);
      }
    }
  }

  onSubmitCustomerlogin(data) {
    console.log("data==", data);
    var value = {
      email: data.userName,
      password: data.password
    }
    if (this.customerLogin.valid) {
      try {
        this.api.customerLogin(value).then((res: any) => {
          console.log("create customer res==", res);
          if (res.status) {
            if (res.token) {
              this.loginInvalidCust=false;
              localStorage.setItem('token', res.token);
              var start = new Date() as any;
              var end = new Date();
              var date = end.setHours(start.getHours() + 1);
              res.success.timer = date;
              res.success.type = 0;
              if (this.login.login(res.success)) {
                this.router.navigate(['/projects']);
              }
              else {
                this.loginInvalidCust = true;
              }
            }
            else {
              this.loginInvalidCust = true;
            }
          }
          else {
            this.loginInvalidCust = true;
          }
        }).catch(err => {
          console.log("error==", err);
        })
      }
      catch (err) {
        console.log("err=", err);
      }
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }
  hideShowPassword1() {
    this.passwordType1 = this.passwordType1 === 'text' ? 'password' : 'text';
    this.passwordIcon1 = this.passwordIcon1 === 'visibility_off' ? 'visibility' : 'visibility_off';
  }
}
