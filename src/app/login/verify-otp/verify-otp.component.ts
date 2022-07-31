import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../services/api.service';
import {LoginAuthService} from '../../services/login-auth.service';
import {GeneralService} from '../../services/general.service';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  otpInput:FormGroup;
  email:any='';
  constructor(   
    private fb:FormBuilder,
    private api : ApiService,
    private router:Router,
    private route: ActivatedRoute,
    public general : GeneralService,
    private login:LoginAuthService
    ) { }

  ngOnInit(): void {
    this.otpInput = this.fb.group({
      otp1: ['',Validators.required],
      otp2: ['',Validators.required],
      otp3: ['',Validators.required],
      otp4: ['',Validators.required],
      otp5: ['',Validators.required],
      otp6: ['',Validators.required],
    });
    this.route.queryParams.subscribe((param:any)=>{
      console.log("param===",param);
      this.email=param.email;
      // console.log("emaill==",JSON.parse(param));
      
    })
  }
  getCodeBoxElement(index) {
    return document.getElementById('codeBox' + index);
  }

  onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;

    if (index !== 6) {
      this.getCodeBoxElement(index + 1).focus();
    } else {
      this.getCodeBoxElement(index).blur();
    }

    if (eventCode === 8 && index !== 1) {
      this.getCodeBoxElement(index - 1).focus();
    }
  }

  submitOtp(data){
    data.otp=data.otp1+data.otp2+data.otp3+data.otp4+data.otp5+data.otp6;
    data.email=this.email;
    try{
      if(this.otpInput.valid){
          console.log("data==",data)
          this.api.partnerOtpVerification(data).then((res:any)=>{
            console.log("res otp===",res);
            if(res.status){
              this.general.openSnackBar(res.success,'');
              this.router.navigate(['/login']);
            }
            else{
              this.general.openSnackBar(res.success,'');
            }
          }).catch((err)=>{
            console.log("err==",err);         
          })
        }   
    }
    catch{}
  }

  resendOtp(){
    var data={
      email:this.email
    }
    console.log(" resend otp data==",data);
    
    try{
        if(this.otpInput.valid){
          this.api.partnerOtpResend(data).then((res:any)=>{
            if(res.status){
              console.log(" resend otp res==",res);

              this.general.openSnackBar(res.success,'');
            }
            else{
              this.general.openSnackBar(res.success,'');
            }
          }).catch((err)=>{
            console.log("err==",err);         
          })
        }   
    }
    catch{}
  }
}
