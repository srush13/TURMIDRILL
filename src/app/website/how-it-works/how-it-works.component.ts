import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../services/general.service';
@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  constructor(public general : GeneralService) { }

  ngOnInit(): void {
  }

}
