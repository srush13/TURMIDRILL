import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metal-fabrication',
  templateUrl: './metal-fabrication.component.html',
  styleUrls: ['./metal-fabrication.component.css']
})
export class MetalFabricationComponent implements OnInit {
  type:any='';
  type1:any='';
  type2:any='';
  constructor() { }

  ngOnInit(): void {
  }
  getType(data){
    this.type=data;
  }
  getType1(data){
    this.type1=data;
  }
  getType2(data){
    this.type2=data;
  }

}
