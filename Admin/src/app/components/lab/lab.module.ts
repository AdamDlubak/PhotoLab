import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/modules/shared.module";

import { UserService } from "../../shared/services/user.service";
import { FileService } from "./services/file.service";
import { Routing } from "./lab.routing";
import { LabLayoutComponent } from "./_layout/lab-layout.component";
import { HomeComponent } from "./home/home.component";
import { PhotoCropComponent } from "./photo-crop/photo-crop.component";


@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, Routing],
  declarations: [LabLayoutComponent, HomeComponent, PhotoCropComponent],
  exports: [],  
  providers: [UserService, FileService]
})

export class LabModule {}