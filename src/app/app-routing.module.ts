import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { VerifyOtpComponent } from './login/verify-otp/verify-otp.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { LandingComponent } from './website/landing/landing.component';
import { PartnerComponent } from './website/create-partner/partner/partner.component';
import { PrintingComponent } from './website/capabilities/printing/printing.component';
import { CncMachiningComponent } from './website/capabilities/cnc-machining/cnc-machining.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { ApplyForPartnerComponent } from './website/create-partner/apply-for-partner/apply-for-partner.component';
import { CreateProjectComponent } from './project/createProject/create-project/create-project.component';
import { MachineCapabilityComponent } from './project/createProject/machine-capability/machine-capability.component';
import { UploadFileComponent } from './project/createProject/upload-file/upload-file.component';
import { EnquiryComponent } from './project/createProject/enquiry/enquiry.component';
import { ThankYouPageComponent } from './project/createProject/thank-you-page/thank-you-page.component';
import { OrderHistoryComponent } from './project/order-history/order-history.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { HowItWorksComponent } from './website/how-it-works/how-it-works.component';
import { AboutUsComponent } from './website/about-us/about-us.component';
import { ContactUsComponent } from './website/contact-us/contact-us.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { QuotationComponent } from './project/quotation/quotation.component';
import { AddressComponent } from './my-account/address/address.component';
import { MetalFabricationComponent } from './website/capabilities/metal-fabrication/metal-fabrication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnderReviewComponent } from './under-review/under-review.component';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';
import { PastOrderComponent } from './past-order/past-order.component';

import { AuthGuard } from './auth.guard';
import { ValidateRouteGuard } from './validate-route.guard';

const routes: Routes = [
  {path:'',component:LandingComponent,canActivate:[ValidateRouteGuard]},
  {path:'landing',component:LandingComponent,canActivate:[ValidateRouteGuard]},
  {path:'login',component:LoginComponent,canActivate:[ValidateRouteGuard]},
  {path:'verify-otp',component:VerifyOtpComponent,canActivate:[ValidateRouteGuard]},
  {path:'about-us',component:AboutUsComponent,canActivate:[ValidateRouteGuard]},
  {path:'contact-us',component:ContactUsComponent,canActivate:[ValidateRouteGuard]},
  {path:'how-it-works',component:HowItWorksComponent,canActivate:[ValidateRouteGuard]},
  {path:'partner',component:PartnerComponent,canActivate:[ValidateRouteGuard]},
  {path:'printing',component:PrintingComponent,canActivate:[ValidateRouteGuard]},
  {path:'cnc-machining',component:CncMachiningComponent,canActivate:[ValidateRouteGuard]},
  {path:'metal-fabrication',component:MetalFabricationComponent,canActivate:[ValidateRouteGuard]},
  {path:'sign-in',component:SignInComponent,canActivate:[ValidateRouteGuard]},
  {path:'apply-for-partner',component:ApplyForPartnerComponent,canActivate:[ValidateRouteGuard]},
  
  {path:'projects',component:ProjectsComponent,canActivate:[AuthGuard]},
  {path:'project-name',component:CreateProjectComponent,canActivate:[AuthGuard]},
  {path:'machine-capability',component:MachineCapabilityComponent,canActivate:[AuthGuard]},
  {path:'upload-file',component:UploadFileComponent,canActivate:[AuthGuard]},
  {path:'enquiry',component:EnquiryComponent,canActivate:[AuthGuard]},
  {path:'last',component:ThankYouPageComponent,canActivate:[AuthGuard]},
  {path:'order-history/:id',component:OrderHistoryComponent,canActivate:[AuthGuard]},
  {path:'my-account',component:MyAccountComponent,canActivate:[AuthGuard]},
  {path:'address',component:AddressComponent,canActivate:[AuthGuard]},
  {path:'chat-box',component:ChatBoxComponent,canActivate:[AuthGuard]},
  {path:'underReview',component:UnderReviewComponent,canActivate:[AuthGuard]},
  {path:'active-orders',component:ActiveOrdersComponent,canActivate:[AuthGuard]},
  {path:'past-orders',component:PastOrderComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'quotation',component:QuotationComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
