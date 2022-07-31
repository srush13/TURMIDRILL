import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoginAuthService } from '../services/login-auth.service';
import {GeneralService} from '../services/general.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  loginData:any;
  customerRegistration: FormGroup;
  contact:FormGroup;
  customerData:any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private login:LoginAuthService,
    private general :GeneralService) { }

  ngOnInit(): void {
    this.loginData = this.login.loginData().data;
    this.customerRegistration = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      companyName: ['',Validators.required],
      // password: ['',Validators.required],
      country: ['',Validators.required],
      mobileNumber: ['',Validators.required],
      pincode: ['',Validators.required],
      // paymentMode:['',Validators.required]
      // policy:['',Validators.required]
    });
    this.getCustomerData();
  }
    
  submit(data){
    console.log("data",data);   
    this.api.updateCustomerDetails(data).then((res:any)=>{
      console.log("res==", res)
      if(res.status){
        this.general.openSnackBar(res.success,'');
        // this.router.navigate(['/login'])
      }
    }).catch((err:any)=>{
      console.log("err==",err);
      
    })
  }
  getCustomerData(){
   var data={
     id:this.loginData.id
   } 
    this.api.getCustomer(data).then((res:any)=>{
      console.log("res==", res)
      if(res.status){
        this.customerRegistration.patchValue({
          email: res.success.email,
          firstName: res.success.firstName,
          lastName: res.success.lastName,
          companyName: res.success.companyName,
          // password: res.success.password,
          country: res.success.country,
          mobileNumber: res.success.mobileNumber,
          pincode: res.success.pincode,
          // paymentMode:res.success.paymentMode, 
               // policy:['',Validators.required]
        })
      }
    }).catch((err:any)=>{
      console.log("err==",err);
      
    })
  }

}
