import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/modules/shared.module";
import { UserService } from "../../shared/services/user.service";
import { FileService } from "./services/file.service";
import { Routing } from "./lab.routing";
import { LabLayoutComponent } from "./_layout/lab-layout.component";
import { HomeComponent } from "./home/home.component";
import { PhotoCropComponent } from "./photo-crop/photo-crop.component";
import { PrintTypeComponent } from "./photo-crop/print-type/print-type.component";
import { CartComponent } from "./photo-crop/cart/cart.component";
import { AngularCropperjsModule } from 'angular-cropperjs';
import { FileUploadModule  } from 'ng2-file-upload';
import { ImagePreview } from "./services/image-preview.directive";


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailedDataComponent } from './order-detailed-data/order-detailed-data.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, Routing, AngularCropperjsModule, FileUploadModule, NgbModule.forRoot()  ],
  declarations: [LabLayoutComponent, HomeComponent, PhotoCropComponent, PrintTypeComponent, ImagePreview, CartComponent,
    OrderDetailedDataComponent,
    LoginModalComponent
],
  exports: [],  
  providers: [UserService, FileService]
})

export class LabModule {}