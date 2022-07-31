import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cnc-machining',
  templateUrl: './cnc-machining.component.html',
  styleUrls: ['./cnc-machining.component.css']
})
export class CncMachiningComponent implements OnInit {
  type:any=''
  type1:any=''
    constructor() { }
  
    ngOnInit(): void {
    }
    getType(data){
      this.type=data
    }
    getType1(data){
      this.type1=data
    }

}
