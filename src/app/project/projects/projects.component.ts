import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { LoginAuthService } from '../../services/login-auth.service';
import { ApiService } from '../../services/api.service';
import { SocketService } from '../../services/socket.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  loginData:any;
  project: any = [];
  host:any=environment.apiHost
  constructor(
    public general: GeneralService,
    private api: ApiService,
    private login :LoginAuthService,
    private socket:SocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginData = this.login.loginData().data;
    this.getProjects();
  }
  
  getProjects(){
      this.api.getProject().then((res: any) => {
      this.project=[];
      console.log("project res==", res);
      if (res.status) {
        this.project= res.success;
      }
    }).catch((err: any) => {
      console.log("err==", err);
    })
  }
  
  // intialize(){
  //   this.socket.initiliaze();
  // }
  // send(){
  //   this.socket.sendMsg("hi shimoooo");
  // }
}
