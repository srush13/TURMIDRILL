import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  encryptInfo:any
  decryptedInfo:any;
  project : any = '';
  createProjectForm = {
    customerId: 0 as Number,
    projectName : null as String,
    machiningCapability: null as Number,
    file: [] as Array<any>,
    material: null as Number,
    finishing: null as Number,
    quantity : 0 as Number,
    comment: null as String,
  };
  isMobile: boolean;
  isTablet: boolean;
  isDesktopDevice: boolean;
  orderReview: any = [
    {
      name: 'UnderReview',
      status: false
    },
    {
      name: 'Accepted',
      status: false
    },
    {
      name: 'Manufacturing',
      status: false
    },
    {
      name: 'Quality Check',
      status: false
    },
    {
      name: 'Dispatched',
      status: false
    }, {
      name: 'Delivered',
      status: false
    }];
  constructor(
    private snackBar:MatSnackBar,
    private deviceService: DeviceDetectorService) {
      this.isMobile = this.deviceService.isMobile();
      this.isTablet = this.deviceService.isTablet();
      this.isDesktopDevice = this.deviceService.isDesktop();
    }
  encrypt(data: any) {
    this.encryptInfo = CryptoJS.AES.encrypt(JSON.stringify(data), this.getToken()).toString();
    return this.encryptInfo
  }

  decrypt(data: any) {
    var deData = CryptoJS.AES.decrypt(data, this.getToken());
    this.decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    return this.decryptedInfo
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  getToken() {
    return localStorage.getItem('token')
  }
}
