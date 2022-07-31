import { Component, OnInit, Input } from '@angular/core';
import { LoginAuthService } from '../services/login-auth.service';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Chats {
  id: number,
  from: string,
  customerId: number,
  partnerId: number,
  message: string,
  createdAt: Date,
  updatedAt: Date
};
interface ProfileData {
  type: string,
  customerId: number,
  partnerId: number,
}
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input() id : number;
  profileData: ProfileData;
  chatForm: FormGroup;
  chats: Chats[];
  loginData: any;
  openChat:boolean;
  closeMsg:boolean;
  constructor(
    private login: LoginAuthService,
    private api: ApiService,
    private socket: SocketService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginData = this.login.loginData().data;
    console.log("id==",this.id);
    
    this.profileData = {
      type: this.loginData.type == 0 ? 'customer' : 'partner',
      customerId: this.loginData.type == 0 ? this.loginData.id : this.id,
      partnerId: this.loginData.type == 1 ? this.loginData.id : this.id
    }
    console.log("profileDATA=", this.profileData);

    this.chatForm = this.fb.group({
      message: ['']
    });

    this.socket.initiliaze();
    this.getUserChats();

    this.socket.recieveMsg().subscribe((msg: any) => {
      let data: Chats;
      data = {
        id: 0,
        customerId: msg.from,
        partnerId: msg.to,
        from: msg.type,
        createdAt: new Date(),
        updatedAt: new Date(),
        message: msg.message,
      }
      this.chats.push(data);
    });
  }

  getUserChats() {
    var data = {
      customerId: this.profileData.customerId,
      partnerId: this.profileData.partnerId
    }
    this.api.getUserChats(data).then((res: any) => {
      console.log("chat res====", res);
      if (res.status) {
        this.chats = res.success;
      }
    })
  }

  sendMessage(msg) {
    var str =msg.message.toString().replace(/\s/g, '');
    console.log("str==",str.length)
    let data: Chats;
    data = {
      id: 0,
      customerId: this.profileData.customerId,
      partnerId: this.profileData.partnerId,
      from: this.profileData.type,
      createdAt: new Date(),
      updatedAt: new Date(),
      message: msg.message,
    }
    if(str !='' ||  str.length != 0){
      this.chats.push(data);
      this.socket.sendMsg(data);
    }
    this.chatForm.reset(this.chatForm) 
    // this.chatForm.patchValue({
    //   message:''
    // });
  }
  
  getTooltip(){
    if(this.loginData.type == 0){
      return 'Leave a message'
    }
    if(this.loginData.type == 1){
      return 'Leave a message to Customer'
    }
  }
}
