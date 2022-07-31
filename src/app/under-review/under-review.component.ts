import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { LoginAuthService } from '../services/login-auth.service';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-under-review',
  templateUrl: './under-review.component.html',
  styleUrls: ['./under-review.component.css']
})
export class UnderReviewComponent implements OnInit {
  project: any = [];
  loginData: any;
  underReviewOrder: any = [];
  expand: boolean = false;
  orderDetail: any = [];
  constructor(
    public general: GeneralService,
    private api: ApiService,
    private login: LoginAuthService,
    private socket: SocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginData = this.login.loginData().data;
    this.getActiveOrder();
    this.getPartnerUnderReviewOrder();
  }

  getActiveOrder() {
    this.api.getActiveOrder().then((res: any) => {
      this.project = [];
      console.log("project res==", res);
      if (res.status) {
        this.project = res.success;
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }


  getPartnerUnderReviewOrder() {
    this.api.getPartnerUnderReviewOrder().then((res: any) => {
      this.underReviewOrder = []
      console.log("project res==", res);
      if (res.status) {
        this.underReviewOrder = res.success;
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }

  getDetails(data, i) {
    console.log("data===", data);
    data.i = i + 1;
    this.orderDetail = [];
    if (data) {
      this.expand = true;
      this.orderDetail = data;
    }
  }

  change(event, i) {
    console.log("value", event.value, "i===", i);

  }
}
