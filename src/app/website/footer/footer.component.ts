import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  subscribeForm:FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public general: GeneralService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.subscribeForm = this.fb.group({
      email: ['', Validators.required]
    })
  }
  subscribe(data){
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
