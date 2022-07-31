import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../services/general.service';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  contact:FormGroup;
  constructor(
    private fb:FormBuilder,
    public general: GeneralService,
    private api: ApiService,) { }

  ngOnInit(): void {
    this.contact=this.fb.group({
      email:['',Validators.required]
    });
  }
  submit(data){
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
