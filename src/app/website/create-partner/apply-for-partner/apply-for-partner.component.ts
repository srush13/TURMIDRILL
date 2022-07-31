import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { ApiService } from '../../../services/api.service';
import { GeneralService } from '../../../services/general.service';
import { LoginAuthService } from '../../../services/login-auth.service';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

interface MachineCapability {
  id: Number,
  name: String,
  fileId: Number,
  createdAt: Date,
  updatedAt: Date
}
interface Materials {
  id: Number,
  machineCategoryId?: Number,
  name: String,
  createdAt: Date,
  updatedAt: Date
}
interface Finishings {
  id: Number,
  machineCategoryId?: Number,
  name: String,
  createdAt: Date,
  updatedAt: Date
}
@Component({
  selector: 'app-apply-for-partner',
  templateUrl: './apply-for-partner.component.html',
  styleUrls: ['./apply-for-partner.component.css']
})
export class ApplyForPartnerComponent implements OnInit {
  partnerForm: FormGroup;
  contact: FormGroup;
  machineCapabilitydata: MachineCapability;
  materials: Materials[];
  finishings: Finishings[];
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India];
  country: any = [];
  public filteredList: any = [];
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public general: GeneralService,
    private login: LoginAuthService
  ) {

  }

  ngOnInit(): void {
    this.getLoc();
    this.partnerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      pincode: ['', Validators.required],
      policy: ['', Validators.required],
      machiningCapability: ['', Validators.required],
      material: ['', Validators.required],
      finishing: [''],
    });

    this.contact = this.fb.group({
      email: ['', Validators.required]
    })

    this.getMachiningCapability();
  }

  getMachiningCapability() {
    this.api.getMachiningCapability().then((res: any) => {
      console.log("getMachiningCapability res", res);
      if (res.status) {
        this.machineCapabilitydata = res.success;
      }
      console.log(this.machineCapabilitydata);
    }).catch((err: any) => {
      console.log("err==", err);

    })
  }


  getMaterialAndFinishing(value) {
    this.getMaterialdata(value);
    this.getFinishingData(value);
  }

  getMaterialdata(value) {
    console.log("value==", value);

    var data = {
      machineCategoryId: value
    };
    console.log("machineCategoryId==", data);

    this.api.getMaterialCategory(data).then((res: any) => {
      console.log("getMaterialCategory res==", res);
      if (res.status) {
        this.materials = res.success;
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }


  getFinishingData(value) {
    console.log("value==", value);

    var data = {
      machineCategoryId: value
    };
    console.log("machineCategoryId==", data);
    this.api.getFinishing(data).then((res: any) => {
      console.log("getFinishing res==", res);
      if (res.status) {
        this.finishings = res.success;
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }

  getLoc() {
    this.country = []
    this.api.getCountries().then((res: any) => {
      res.forEach(obj => {
        this.country.push(obj.name)
      });
      this.filteredList = this.country.slice();
      // console.log("this.loc==", this.country);
    }).catch(err => {
      console.log("er=====", err);
    })
  }

  submit(data) {
    console.log("data==", data)
    try {
      if (this.partnerForm.valid) {
        data.mobileNumber = data.mobileNumber.e164Number;
        data.materials = [];
        data.finishings = [];

        this.materials.filter(obj => {
          if (data.material instanceof Array) {
            if (data.material.includes(obj.id)) {
              const index = data.material.indexOf(obj.id);
              data.materials.push(
                {
                  machiningCapabilityId: obj.machineCategoryId,
                  materialId: data.material[index]
                }
              )
            }
          }
        });

        this.finishings.filter(obj => {
          if (data.finishing instanceof Array) {
            if (data.finishing.includes(obj.id)) {
              const index = data.finishing.indexOf(obj.id)
              data.finishings.push(
                {
                  machiningCapabilityId: obj.machineCategoryId,
                  finishingId: data.finishing[index]
                }
              )
            }
          }
        });

        console.log("data===", data);

        this.api.createPartner(data).then((res: any) => {
          console.log("res==", res)
          if (res.status) {
            this.general.openSnackBar(res.success, '')
            this.router.navigate(['/verify-otp'],{queryParams :{email:data.email}});
          }
        }).catch((err: any) => {
          console.log("err==", err);
        })
      }
    }
    catch (err) {
      console.log("error===", err);
    }
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
