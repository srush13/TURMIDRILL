import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { ApiService } from '../../../services/api.service';
import { LoginAuthService } from '../../../services/login-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  enquiryForm: FormGroup
  file: any = 0
  materials: any = []
  finishing: any = []
  projectId: number = 0;
  loginData: any;
  disable: boolean = true;
  host: any = environment.apiHost;
  constructor(
    public general: GeneralService,
    private api: ApiService,
    private login: LoginAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formInit();
    this.route.queryParams.subscribe((param: any) => {
      this.projectId = JSON.parse(param.id);
      if (this.projectId != 0) {
        this.getProjects(this.projectId);
      }
      else {
        this.router.navigate(['/projects']);
      }
    })
    // if (this.routeValidation()) {
    //   this.loginData = this.login.loginData().data;
    //   this.general.createProjectForm.customerId = this.loginData.id;



    //   this.enquiryForm.patchValue({
    //     material: this.general.createProjectForm.material,
    //     finishing: this.general.createProjectForm.finishing,
    //     comment: this.general.createProjectForm.comment,
    //     quantity: this.general.createProjectForm.quantity,
    //   })

    //   console.log("value==", this.general.createProjectForm)
    // }

  }

  formInit() {
    this.enquiryForm = this.fb.group({
      materialId: ['', Validators.required],
      finishingId: ['', Validators.required],
      comment: [''],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
  }


  onSubmit(data) {
    data.id = this.projectId;
    console.log("data==", data);
    if (this.enquiryForm.valid) {
      try {

        this.api.updateEnquiry(data).then((res: any) => {
          this.general.openSnackBar(res.success, '');
          if (res.status) {
            this.disable = false;
            this.getProjects(this.projectId);
          }
          else {
            this.disable = true;
          }
        }).catch((err) => {
          console.log("err=", err)
        })
      } catch (err) {
        console.log("error==", err);

      }
    }
  }

  count(a) {
    let value = this.enquiryForm.get('quantity').value + a;
    if (!(value < 0)) {
      this.enquiryForm.patchValue({
        quantity: value
      })
    }
  }

  getMaterialdata(value) {
    var data = {
      machineCategoryId: value
    };
    console.log("machineCategoryId==", data);
    this.materials = []
    this.api.getMaterialCategory(data).then((res: any) => {
      console.log("getMaterialCategory res==", res);
      if (res.data.status) {
        this.materials = res.data.success
      }
    }).catch((err: any) => {
      console.log("err==", err);

    })
  }

  getFinishingdata(value) {
    var data = {
      machineCategoryId: value
    };
    console.log("machineCategoryId==", data);
    this.finishing = []
    this.api.getFinishing(data).then((res: any) => {
      console.log("getFinishing res==", res);
      if (res.status) {
        this.finishing = res.success;
      }

    }).catch((err: any) => {
      console.log("err==", err);

    })
  }

  enquiry(data) {
    data.id = this.projectId;
    this.api.processEnquiry(data).then((res: any) => {
      console.log("project res==", res);
      this.general.openSnackBar(res.success, '');
      if (res.status) {
        this.enquiryForm.reset();
        this.router.navigate(['/last']);
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }

  getProjects(id) {
    var data = {
      id: id
    }
    this.api.getOrderedProject(data).then((res: any) => {
      console.log(" get project id res==", res);
      if (res.status) {
        this.file = [];
        if (res.success.name != null && res.success.machineCapabilityId != null && res.success.fileId != null) {
          this.file = res.success;
          this.enquiryForm.patchValue({
            materialId: res.success.materialId,
            finishingId: res.success.finishingId,
            comment: res.success.comment == '-' ? '' : res.success.comment,
            quantity: res.success.quantity,
          });
          if (res.success.materialId != null || res.success.finishingId != null) {
            this.disable = false;
          }
          this.getMaterialdata(res.success.machineCapabilityId);
          this.getFinishingdata(res.success.machineCapabilityId);
        }
        else {
          this.router.navigate(['/upload-file'], { queryParams: { id: this.projectId } });
        }
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }

}
