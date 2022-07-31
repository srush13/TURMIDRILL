import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  path:any='';
  loginDetails = {
    status: false as boolean,
    loginData: null as any
  };
  toggle:boolean;
  showLabel:boolean=false;
  contact:FormGroup;
  constructor(private fb:FormBuilder,
    public login: LoginAuthService,
    public general : GeneralService
  ) {

  }

  ngOnInit(): void {
    this.loginDetails.loginData = this.login.loginData().data;
    this.loginDetails.status = this.login.loginData().status;
    console.log("log data===", this.loginDetails);;
    this.login.loginCheckData.subscribe((res: any) => {
      if (!res) {
        this.loginDetails.status = false;
        this.loginDetails.loginData = null;
        console.log("this.loginDetails==",this.loginDetails);
        
      } else {
        this.loginDetails.loginData = this.login.loginData().data;
        this.loginDetails.status = this.login.loginData().status;
      }
    })
    this.contact=this.fb.group({
      email:['',Validators.required]
    });
    this.path=window.location.pathname;
    console.log("this.path===",this.path);
  }

}
