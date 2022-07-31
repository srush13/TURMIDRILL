import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginAuthService } from '../services/login-auth.service';
import { io } from "socket.io-client";
import{ Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket = io(environment.socketHost);
  loginData: any;
  constructor(
    private login: LoginAuthService
  ) {
    this.loginData = this.login.loginData().data;
    this.recieveMsg();
  }

  initiliaze() {
    let data = { room: this.loginData.id };
    this.socket.emit('initialize', data);
  }

  sendMsg(msg) {
    let data = { from: msg.customerId, message: msg.message, to: msg.partnerId, type: msg.from };
    this.socket.emit('msg', data);
  }

  recieveMsg() {
    return new Observable((observer:any)=>{
      this.socket.on('inbox', (data) => {
        console.log("receive msg==", data);
        if((this.loginData.type == 0 && data.type == 'partner') || (this.loginData.type == 1 && data.type == 'customer') ){
          observer.next(data);
        }
      });
    })
  }

}
