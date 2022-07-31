import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoginAuthService } from '../../services/login-auth.service';
import {GeneralService} from '../../services/general.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm:FormGroup;
  type:any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private login:LoginAuthService,
    private general :GeneralService
  ) { }

  ngOnInit(): void {
     this.addressForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      mobileNumber:['',Validators.required],
      flat:['',Validators.required],
      area:['',Validators.required],
      landmark:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pinCode:[''],
    });

    this.route.queryParams.subscribe((param:any)=>{
      this.type = param.address || '';
      console.log("type===",this.type);
    })
  }

  submitAddress(data){
    console.log("data===",data);
  }

}
