import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../services/api.service';
import {LoginAuthService} from '../../services/login-auth.service';
import {GeneralService} from '../../services/general.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm:FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  passwordType1: string = 'password';
  passwordIcon1: string = 'visibility_off';
  equal:boolean
  constructor(   
    private fb:FormBuilder,
    private api : ApiService,
    private router:Router,
    private route: ActivatedRoute,
    public general : GeneralService,
    private login:LoginAuthService
    ) { }

  ngOnInit(): void {
    this.resetPasswordForm =this.fb.group({
      email:['',Validators.email],
      newPassword:[''],
      confirmPassword:['']
    })
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }
  hideShowPassword1() {
    this.passwordType1 = this.passwordType1 === 'text' ? 'password' : 'text';
    this.passwordIcon1 = this.passwordIcon1 === 'visibility_off' ? 'visibility' : 'visibility_off';
  }
  isPwdEql(event){
    if(event.value.length == this.resetPasswordForm.get('newPassword').value.length){
      this.equal= event.value !=this.resetPasswordForm.get('newPassword').value ? true:false;
    }
  }
  submit(data){

  }
  
}
