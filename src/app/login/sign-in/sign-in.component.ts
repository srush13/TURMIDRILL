import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ApiService } from '../../services/api.service';
import { LoginAuthService } from '../../services/login-auth.service';
import {GeneralService} from '../../services/general.service';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  country:any=[];
  customerRegistration: FormGroup;
  contact:FormGroup;
  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.India];
  public filteredList :any=[];
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public general :GeneralService,
    private login: LoginAuthService
  ) { }

  ngOnInit(): void {
    this.getLoc();
    this.customerRegistration = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      companyName: ['',Validators.required],
      password: ['',Validators.required],
      country: ['',Validators.required],
      mobileNumber: ['',Validators.required],
      pincode: ['',Validators.required],
      policy:['',Validators.required]
    });
    this.contact=this.fb.group({
      email:['',Validators.required]
    })
  }
  
  submit(data){
    data.mobileNumber=data.mobileNumber.e164Number
    console.log("data",data);   
    this.api.createCustomer(data).then((res:any)=>{
      console.log("res==", res)
      if(res.status){
        this.general.openSnackBar(res.success,'')
        this.router.navigate(['/login']);
      }
    }).catch((err:any)=>{
      console.log("err==",err);   
    })
  }

  getLoc(){
    this.country = [];
    this.api.getCountries().then((res:any)=>{
       res.forEach(obj => {
        this.country.push(obj.name)
      });
      this.filteredList=this.country.slice();
      // console.log("this.loc==",this.country);
    }).catch(err=>{
      console.log("er=====",err);
    })
  }
  submitContact(data){
    data.name=data.email;
    try{
     if(data){
       console.log("contactPersonDetails data", data);
       this.api.contactPersonDetails(data).then((res: any) => {
         console.log("contactPersonDetails res", res);
         if (res) {
           this.general.openSnackBar(res.success,'');
         }
       }).catch((err: any) => {
         console.log("err==", err);
         })
     }
    }catch(err){
      console.log("err==",err)
    }
  }
}
