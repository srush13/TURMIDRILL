import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { LoginAuthService } from '../services/login-auth.service';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  activeOrder: any = [];
  expand: boolean = false;
  orderDetail: any = [];
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
      this.getPartnerActiveOrder();
    }
    else{
      this.getCustomerActiveOrder();
    }

  }

  getPartnerActiveOrder() {
    this.api.getPartnerActiveOrder().then((res: any) => {
      this.activeOrder = [];
      console.log("activeOrder res==", res);
      if (res.status) {
        this.activeOrder = res.success;
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }
  getCustomerActiveOrder() {
    this.api.getCustomerActiveProjects().then((res: any) => {
      this.activeOrder = [];
      console.log("activeOrder res==", res);
      if (res.status) {
        this.activeOrder = res.success;
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
