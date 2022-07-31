import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { ApiService } from '../../../services/api.service';
import {environment} from '../../../../environments/environment'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machine-capability',
  templateUrl: './machine-capability.component.html',
  styleUrls: ['./machine-capability.component.css']
})
export class MachineCapabilityComponent implements OnInit {
machineCapability: FormGroup;
machineCapabilitydata: any;
host:any=environment.apiHost;
projectId:number = 0;
  constructor(
    private general: GeneralService,
    private api: ApiService,
    private router: Router,
    private route:ActivatedRoute,
    private fb :FormBuilder
  ) { }

  ngOnInit(): void {
    this.machineCapability=this.fb.group({
      machiningCapability:['',Validators.required]
    })
    // if(this.routeValidation()){
    //   this.getMachiningCapability()
    // }
    // this.route.queryParams.subscribe((param:any)=>{
    //   console.log("param",param);
    //   this.projectId = JSON.parse(param.id);
    //   if(this.projectId != 0){
    //     this.getProjects(this.projectId);
    //   }
    //   else{
    //     this.router.navigate(['/projects']);
    //   }
    // })
  }

  
  routeValidation() {
    if (!this.general.createProjectForm.projectName ) {
      this.router.navigate(['/project-name']);
      return false;
    }
    return true;
  }

  getMachiningCapability(){
    this.api.getMachiningCapability().then((res:any)=>{
      console.log("getMachiningCapability res",res.data);
      if(res.data.status){
        this.machineCapabilitydata=res.data.success.map(x=>({...x , isSelected:false}));
      }
      console.log(this.machineCapabilitydata);
      
    }).catch((err:any)=>{
      console.log("err==",err);
      
    })
  }
  isSelected(data){
    this.machineCapabilitydata = this.machineCapabilitydata.map((obj)=>{
    
      if(obj.id == data.id){
        obj.isSelected= true;
        var value={
          id:this.projectId,
          machiningCapabilityId:data.id
        }
        // this.general.createProjectForm.machiningCapability=data.id;
        this.api.updateMachineCapabilityId(value).then((res:any)=>{
          this.general.openSnackBar(res.success,'');
          if(res.status){
            // this.router.navigate(['/upload-file'],{queryParams:{id:JSON.stringify(this.projectId)}});
          }
        }).catch((err)=>{
          console.log("err==",err);
        })
      }
      else{
        obj.isSelected= false ;
     
      }
      return obj;
    })
    // console.log(" this.general.createProjectForm===", this.general.createProjectForm);
    
  }
  getProjects(id) {
    var data = {
      id: id
    }
    this.api.getOrderedProject(data).then((res: any) => {
      console.log(" get project id res==", res);
      if (res.status) {   
        // this.machineCapability.patchValue({
        //   machiningCapability:res.success.machineCapabilityId
        // })
        if(res.success.name != null){
          this.getMachiningCapability();
        }
        else{
          // this.router.navigate(['/project-name'],{queryParams:{id:this.projectId}});
        }
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }

}
