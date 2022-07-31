import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host: any = environment.apiHost;
  constructor(private http: HttpClient) { }

  customerLogin(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url = this.host + '/customerLogin';
    return new Promise((resolve, reject) => {
      this.http.post(url, data, httpOptions).subscribe((res: any) => {
        resolve(res)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  partnerLogin(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url = this.host + '/partnerLogin';
    return new Promise((resolve, reject) => {
      this.http.post(url, data, httpOptions).subscribe((res: any) => {
        resolve(res)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  partnerOtpVerification(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url = this.host + '/partnerOtpVerification';
    return new Promise((resolve, reject) => {
      this.http.post(url, data, httpOptions).subscribe((res: any) => {
        resolve(res)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  partnerOtpResend(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url = this.host + '/partnerOtpResend';
    return new Promise((resolve, reject) => {
      this.http.post(url, data, httpOptions).subscribe((res: any) => {
        resolve(res)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  createCustomer(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/customerRegister';
    return new Promise((resolve, reject) => {
      this.http.post(url, data, httpOptions).subscribe((res: any) => {
        resolve(res)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getCustomer(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/getCustomer';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  updateCustomerDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/updateCustomerDetails';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  createPartner(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/partnerRegister';
    return new Promise((resolve, reject) => {
      this.http.post(url, data, httpOptions).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getPartner(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/getPartner';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getMachiningCapability() {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    let url = this.host + '/getMachiningCapability';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getMaterialCategory(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/getMaterialCategory';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getFinishing(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/getFinishing';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  createProject(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/createProject';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  updateProjectName(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/updateProjectName';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  updateMachineCapabilityId(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/updateMachineCapabilityId';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  uploadImage(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/uploadImage';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  updateEnquiry(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/updateEnquiry';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  processEnquiry(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/processEnquiry';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getProject() {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    // let body={
    //   data:data
    // };
    let url = this.host + '/getProjects';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  getProjectId(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/getProjectId';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getOrderedProject(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/getOrderedProject';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getActiveOrder() {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    let url = this.host + '/getActiveOrder';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getPartnerActiveOrder() {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    let url = this.host + '/getPartnerActiveOrder';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getPartnerPastOrder() {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    let url = this.host + '/getPartnerPastOrder';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  getPartnerUnderReviewOrder() {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    let url = this.host + '/getPartnerUnderReviewOrder';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }



  getCustomerActiveProjects() {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    let url = this.host + '/getCustomerActiveProjects';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  getCustomerPastProjects(){
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    let url = this.host + '/getCustomerPastProjects';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }
  

  getUserChats(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    }
    let url = this.host + '/getUserChats';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data);
      },
        (err => {
          console.log(err);
        }))
    })
  }
  getLocations() {
    return new Promise((resolve, reject) => {
      this.http.get('../../assets/location.json').subscribe((res: any) => {
        resolve(res.location)
      },
        err => {
          reject(err)
        })
    })
  }
  getCountries() {
    return new Promise((resolve, reject) => {
      this.http.get('../../assets/countries.json').subscribe((res: any) => {
        resolve(res.country)
      },
        err => {
          reject(err)
        })
    })
  }

  updateProjectDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/updateProjectDetails';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  updateOrderStatus(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/updateOrderStatus';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  deleteProject(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/deleteProject';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data)
      },
        (err => {
          console.log(err)
        }))
    })
  }

  contactPersonDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    let body = {
      data: data
    };
    let url = this.host + '/contactPersonDetails';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {

        resolve(res)
      },
        (err => {
          console.log(err)
        }))
    })
  }
}
