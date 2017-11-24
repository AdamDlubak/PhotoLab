import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { UserService } from "../../services/user.service";
import { FileService } from "../../services/file.service";
import { Routing } from "./lab.routing";
import { LabLayoutComponent } from "./_layout/lab-layout.component";
import { HomeComponent } from "./home/home.component";
import { OrderPhotoUploadComponent } from "./order-photo-upload/order-photo-upload.component";
import { PrintTypeComponent } from "./order-photo-upload/print-type/print-type.component";
import { CartComponent } from "./order-photo-upload/cart/cart.component";
import { AngularCropperjsModule } from "angular-cropperjs";
import { FileUploadModule } from "ng2-file-upload";
import { ImagePreview } from "../../directives/image-preview.directive";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OrderDetailedDataComponent } from "./order-detailed-data/order-detailed-data.component";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { BootstrapModalModule } from "ng2-bootstrap-modal";
import { UserPanelComponent } from "./user-panel/user-panel.component";
import { RegisterModalComponent } from './register-modal/register-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    Routing,
    AngularCropperjsModule,
    FileUploadModule,
    NgbModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    LabLayoutComponent,
    HomeComponent,
    OrderPhotoUploadComponent,
    PrintTypeComponent,
    ImagePreview,
    CartComponent,
    OrderDetailedDataComponent,
    LoginModalComponent,
    RegisterModalComponent,
    UserPanelComponent
,
    RegisterModalComponent
],
  exports: [],
  providers: [UserService, FileService],
  entryComponents: [LoginModalComponent, RegisterModalComponent]
})
export class LabModule {}
