import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { LoginAuthService } from '../services/login-auth.service';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-past-order',
  templateUrl: './past-order.component.html',
  styleUrls: ['./past-order.component.css']
})
export class PastOrderComponent implements OnInit {
  expand: boolean = false;
  orderDetail: any = [];
  pastOrder: any = [];
  loginData:any;
  constructor(
    public general: GeneralService,
    private api: ApiService,
    private login: LoginAuthService,
    private socket: SocketService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loginData =this.login.loginData().data;
    if(this.loginData.type ==1){
      this.getPartnerPastOrder();
    }
    else{
      this.getCustomerPastOrder();
    }
  }

  getPartnerPastOrder() {
    this.api.getPartnerPastOrder().then((res: any) => {
      this.pastOrder = [];
      console.log("pastOrder res==", res);
      if (res.status) {
        this.pastOrder = res.success;
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }
  
  getCustomerPastOrder() {
    this.api.getCustomerPastProjects().then((res: any) => {
      this.pastOrder = [];
      console.log("pastOrder res==", res);
      if (res.status) {
        this.pastOrder = res.success;
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
