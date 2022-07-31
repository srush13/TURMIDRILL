import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../services/api.service';
import {LoginAuthService} from '../../services/login-auth.service';
import {GeneralService} from '../../services/general.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  verifyEmail:FormGroup;
  verified:boolean;
  constructor(   
    private fb:FormBuilder,
    private api : ApiService,
    private router:Router,
    private route: ActivatedRoute,
    public general : GeneralService,
    private login:LoginAuthService
    ) { }

  ngOnInit(): void {
    this.verifyEmail=this.fb.group({
      email:['',[Validators.email,Validators.required]]
    })
  }
  verifyUser(data){
    console.log("data==",data);
    if(data){
      this.verified=true;

      // this.api.verifyUser(data).then(res=>{
      //   console.log("res===",res);
      //   if(res.status){
      //     this.verified=true;
      //   }
      // }).catch(err=>{
      //   console.log("err=",err);
      // })
    }
    
  }
}
