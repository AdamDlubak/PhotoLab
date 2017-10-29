import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/modules/shared.module";

import { UserService } from "../../shared/services/user.service";
import { Routing } from "./lab.routing";
import { LabLayoutComponent } from "./_layout/lab-layout.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, Routing],
  declarations: [LabLayoutComponent, HomeComponent],
  exports: [],  
  providers: [UserService]
})
export class LabModule {
constructor() {
  console.log("Lab Module:");
}
}