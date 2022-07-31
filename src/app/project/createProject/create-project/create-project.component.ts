import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { LoginAuthService } from '../../../services/login-auth.service';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectName:FormGroup;
  projectId:number=0;
  project:any;
  constructor(
    private general: GeneralService,
    private fb :FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private api: ApiService,
    private login :LoginAuthService
  ) { }

  ngOnInit(): void {
    this.projectName =this.fb.group({
      projectName:['',[Validators.required,Validators.maxLength(30)]]
    });
   
    this.route.queryParams.subscribe((param:any)=>{
      this.projectId = param.id || 0;
      if(this.projectId){
        this.getProjects(this.projectId );
      }
    })
  }
  
  onSubmit(data){
    console.log("data==",data,"error===",this.projectName.get('projectName'));
    if(this.projectName.valid){
      try{
        if(this.project && this.project.name == data.projectName){
          // this.router.navigate(['/machine-capability'],{queryParams:{id:JSON.stringify(this.projectId)}});
        }
        else if(!this.project){
          console.log("create project data===",data);    
          this.api.createProject(data).then((res:any)=>{
            if(res.status){
              this.general.openSnackBar(res.success.msg,'');
              // this.router.navigate(['/machine-capability'],{queryParams:{id:JSON.stringify(res.success.id)}});
            }
            else{
              this.general.openSnackBar(res.success,'');
            }
          }).catch((err)=>{
            console.log("err=",err)
          })
        }
        else if(this.project && this.project.name != data.projectName){
          data.id=this.projectId;
          this.api.updateProjectName(data).then((res:any)=>{
            console.log("res==",res);
            
            this.general.openSnackBar(res.success,'');
            if(res.status){
              // this.router.navigate(['/machine-capability'],{queryParams:{id:JSON.stringify(this.projectId)}});
            }
            else{
              this.general.openSnackBar(res.success,'');
            }
          }).catch((err)=>{
            console.log("err=",err)
          })
        }
             
      }
      catch{
        this.general.openSnackBar("Project creation unsuccessfully",'');
      }
    }
    else{
      this.general.openSnackBar("Project creation unsuccessfully",'');     
    }   
  }

  getProjects(id) {
    var data = {
      id: id
    }
    this.api.getOrderedProject(data).then((res: any) => {
      console.log(" get project id res==", res);
      if (res.status) {
        this.project = res.success;
        this.projectName.patchValue({
          projectName:res.success.name
        });
      }         
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }

 
}
