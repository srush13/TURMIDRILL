import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../services/general.service';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    public general: GeneralService,
    private api: ApiService,
    ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name:['',Validators.required],
      message:[''],
      email:['',[Validators.email,Validators.required]]
    })
  }

  submit(data){
   try{
    if(this.contactForm.valid){
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
