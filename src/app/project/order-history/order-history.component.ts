import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { LoginAuthService } from '../../services/login-auth.service';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  loginData: any;
  project: any = [];
  materials: any = [];
  finishing: any = [];
  machineCapability: any = [];
  orderHistory: FormGroup;
  editable: boolean=false;
  editStatus: boolean;
  host: any = environment.apiHost;
  data: any;
  idToPass : number;
  path: string = '../../../assets/images/';
 

  constructor(
    public general: GeneralService,
    private api: ApiService,
    private login: LoginAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginData = this.login.loginData().data;
    this.orderHistory = this.fb.group({
      name: ['',Validators.required],
      machiningCapability: ['', Validators.required],
      material: ['', Validators.required],
      finishing: ['', Validators.required],
      quantity: ['', Validators.required],
      // address: ['', Validators.required]
    })
    this.route
      .paramMap
      .subscribe(params => {
        this.data =  params.get('id') || 0;
        console.log("thsi.data==", this.data);
        this.getProjects();
      });
  }

  ngOnDestroy() {
    this.general.project = '';
  }

  getProjects() {
    var data = {
      id: this.data
    }
    this.api.getOrderedProject(data).then((res: any) => {
      this.project = {}
      console.log(" ordered project res==", res);
      if (res.status) {
        this.project = res.success;
        this.idToPass = this.loginData.type == 1 ? this.project.customerId : this.project.partnerId;
        this.orderStatusAction(res.success);
        this.getMachiningCapability();
        this.getFinishingdata(this.project.machineCapabilityId);
        this.getMaterialdata(this.project.machineCapabilityId);
        console.log("editable",this.editable);
        
        if(this.editable){
          this.orderHistory.patchValue({
            name: this.project.name,
            machiningCapability: this.project.machineCapabilityId,
            material: this.project.materialId,
            finishing: this.project.finishingId,
            quantity: this.project.quantity,
          })
        }
        else{
          this.orderHistory.patchValue({
            name: this.project.name,
            machiningCapability: this.project.machiningCapability?.name,
            material: this.project.materialCategory?.name,
            finishing: this.project.finishing?.name,
            quantity: this.project.quantity,
          })

        }
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }

  editableStatus(){
    this.editable= !this.editable
    this.getProjects();
  }
  orderStatusAction(data) {
    let n = data.orderStatus == null ? 1 : data.orderStatus;
    this.general.orderReview.map((obj, index) => {
      if (index < n) {
        obj.status = true
      }
      return obj;
    })
  }


  getMachiningCapability() {
    this.machineCapability = [];
    this.api.getMachiningCapability().then((res: any) => {
      console.log("getMachiningCapability res", res);
      if (res.data.status) {
        this.machineCapability = res.data.success;
      }
    }).catch((err: any) => {
      console.log("err==", err);

    })
  }

  getOptions(data) {
    console.log("data==", data)
    this.getFinishingdata(data.value);
    this.getMaterialdata(data.value);
  }

  getMaterialdata(value) {
    var data = {
      machineCategoryId: value
    };
    console.log("machineCategoryId==", data);
    this.materials = [];
    this.api.getMaterialCategory(data).then((res: any) => {
      console.log("getMaterialCategory res==", res);
      if (res.data.status) {
        this.materials = res.data.success;
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
    this.finishing = [];
    this.api.getFinishing(data).then((res: any) => {
      console.log("getFinishing res==", res);
      if (res.status) {
        this.finishing = res.success;
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }

  submit(data) {
    data.id = this.project.id;
    console.log("submit==", data);
    this.api.updateProjectDetails(data).then((res: any) => {
      console.log("updateProjectDetails res==", res);
      this.editable = false;
      this.orderHistory.reset();
      this.getProjects();
      this.general.openSnackBar(res.success, '');
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }


  delete(value) {
   if(confirm("This operation will delete your project")){
    var data = {
      id: value
    };
    console.log("delete==", data);
    this.api.deleteProject(data).then((res: any) => {
      console.log("deleteProject res==", res);
      this.router.navigate(['/projects']);
      this.general.openSnackBar(res.success, '');
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }
   }

  updateOrderStatus(index) {
    var data = {
      id: this.project.id,
      orderStatus: index
    }
    console.log("data==", data);
  if(this.loginData.type == 1 && this.editStatus){
    this.api.updateOrderStatus(data).then((res: any) => {
      console.log("updateOrderStatus res==", res);
      this.getProjects();
      this.general.orderReview.map((obj) => {
        obj.status = false;
        return obj;
      })
      this.general.openSnackBar(res.success, '');
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }
  }

}
