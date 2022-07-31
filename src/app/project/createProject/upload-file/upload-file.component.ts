import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { ApiService } from '../../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  @ViewChild('fileDropRef') fileDropRef: ElementRef;
  imagePath: any = null
  progress: number = 0;
  files: any;
  fileData:any;
  projectId:number=0;
  project:any=[];
  constructor(
    public general: GeneralService,
    public api: ApiService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.routeValidation();
    // this.route.queryParams.subscribe((param:any)=>{
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
    if (!this.general.createProjectForm.projectName &&
      !this.general.createProjectForm.machiningCapability 
    ) {
      this.router.navigate(['/machine-capability']);
      return false;
    }
    return true;
  }

  fileChange(files) {
    console.log("File Change event", files);
    let reader = new FileReader();
    if (files && files.length > 0) {
      this.progress = 0;
      this.files = files[0];
      this.uploadFilesSimulator();
      reader.readAsDataURL(this.files);
      console.log("file===", this.files)
      reader.onload = () => {
        this.imagePath = reader.result;
        console.log("\nReader result", reader.result);
        this.fileData={
          filename: this.files.name,
          fileName: this.files.name + this.randomNumber(),
          filetype: this.files.type,
          value: this.imagePath.split(',')[1],
          format: this.imagePath.split(',')[0]
        }
        
      }
    }
  }

  clearFile() {
    this.imagePath = '';
    this.fileDropRef.nativeElement.value = '';
  }

  randomNumber(min = 1, max = 20) {
    return Math.random() * (max - min) + min;
  }


uploadImage(){
  var data={
    id:this.projectId,
    file:this.fileData
  }
  this.api.uploadImage(data).then((res:any)=>{
    this.general.openSnackBar(res.success,'');
    if(res.status){
      this.router.navigate(['/enquiry'],{queryParams:{id:JSON.stringify(this.projectId)}});
    }
  }).catch((err)=>{
    console.log("err=",err)
  })
}
  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number = 0) {
    setTimeout(() => {
      const progressInterval = setInterval(() => {
        if (this.progress === 100) {
          clearInterval(progressInterval);
          this.uploadImage();
        } else {
          this.progress += 5;
        }
      }, 200);
    }, 1000);
  }

  getProjects(id) {
    var data = {
      id: id
    }
    this.api.getOrderedProject(data).then((res: any) => {
      console.log(" get project id res==", res);
      this.project=[];
      if (res.status) {   
        this.project=res.success;
        if(  res.success.name == null || res.success.machineCapabilityId== null){
          this.router.navigate(['/machine-capability'],{queryParams:{id:this.projectId}});
        }
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }

}
