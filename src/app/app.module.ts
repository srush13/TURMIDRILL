import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { LoginComponent } from './login/login/login.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { CreateProjectComponent } from './project/createProject/create-project/create-project.component';
import { LandingComponent } from './website/landing/landing.component';
import { FooterComponent } from './website/footer/footer.component';
import { PartnerComponent } from './website/create-partner/partner/partner.component';
import { ApplyForPartnerComponent } from './website/create-partner/apply-for-partner/apply-for-partner.component';
import { PrintingComponent } from './website/capabilities/printing/printing.component';
import { CncMachiningComponent } from './website/capabilities/cnc-machining/cnc-machining.component';

import { SignInComponent } from './login/sign-in/sign-in.component';
import { MachineCapabilityComponent } from './project/createProject/machine-capability/machine-capability.component';
import { UploadFileComponent } from './project/createProject/upload-file/upload-file.component';
import { DndDirective } from './project/createProject/uploadFile/dnd.directive';
import { EnquiryComponent } from './project/createProject/enquiry/enquiry.component';
import { ThankYouPageComponent } from './project/createProject/thank-you-page/thank-you-page.component';
import { OrderHistoryComponent } from './project/order-history/order-history.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { HowItWorksComponent } from './website/how-it-works/how-it-works.component';
import { AboutUsComponent } from './website/about-us/about-us.component';
import { ContactUsComponent } from './website/contact-us/contact-us.component';
import { GetStartedComponent } from './website/get-started/get-started.component';
import { QuotationComponent } from './project/quotation/quotation.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { AddressComponent } from './my-account/address/address.component';
import { MetalFabricationComponent } from './website/capabilities/metal-fabrication/metal-fabrication.component';
import { VerifyOtpComponent } from './login/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnderReviewComponent } from './under-review/under-review.component';
import { PastOrderComponent } from './past-order/past-order.component';




@NgModule({
  declarations: [
    AppComponent,
    UserMenuComponent,
    LoginComponent,
    ProjectsComponent,
    CreateProjectComponent,
    LandingComponent,
    FooterComponent,
    PartnerComponent,
    ApplyForPartnerComponent,
    PrintingComponent,
    CncMachiningComponent,
    MetalFabricationComponent,
    SignInComponent,
    MachineCapabilityComponent,
    UploadFileComponent,
    DndDirective,
    EnquiryComponent,
    ThankYouPageComponent,
    OrderHistoryComponent,
    MyAccountComponent,
    HowItWorksComponent,
    AboutUsComponent,
    ContactUsComponent,
    GetStartedComponent,
    QuotationComponent,
    ChatBoxComponent,
    ActiveOrdersComponent,
    AddressComponent,
    VerifyOtpComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    UnderReviewComponent,
    PastOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    NgxIntlTelInputModule,
    MatSelectFilterModule,
    HttpClientModule,
  ],
 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor,multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
