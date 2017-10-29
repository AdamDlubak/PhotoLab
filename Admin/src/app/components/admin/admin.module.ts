import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/modules/shared.module";

import { UserService } from "../../shared/services/user.service";

import { AdminLayoutComponent } from "./_layout/admin-layout.component";
import { AdminHeaderComponent } from "./_layout/elements/header/header.component";
import { AdminSidebarComponent } from "./_layout/elements/sidebar/sidebar.component";

import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { EditFormComponent } from "./edit-form/edit-form.component";
import { HomeComponent } from "./home/home.component";

import { Routing } from "./admin.routing";
import { AuthGuard } from "../../auth.guard";

@NgModule({
  imports: [CommonModule, FormsModule, Routing, SharedModule],
  declarations: [
    RegistrationFormComponent,
    EditFormComponent,
    HomeComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent
  ],
  exports: [],
  providers: [AuthGuard, UserService]
})
export class AdminModule {
  constructor() {
    console.log("Admin Module:");
  }
}
