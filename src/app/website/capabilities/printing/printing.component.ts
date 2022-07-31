import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.css']
})
export class PrintingComponent implements OnInit {
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
