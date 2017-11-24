import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { UserService } from "../../services/user.service";

import { AdminLayoutComponent } from "./_layout/admin-layout.component";
import { AdminHeaderComponent } from "./_layout/elements/header/header.component";
import { AdminSidebarComponent } from "./_layout/elements/sidebar/sidebar.component";

import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { Routing } from "./admin.routing";
import { AuthGuard } from "../../auth.guard";
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { FileService } from "../../services/file.service";
import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './Order/Order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
@NgModule({
  imports: [CommonModule, FormsModule, Routing, SharedModule, ToastrModule.forRoot()],
  declarations: [
    RegistrationFormComponent,
    UserEditComponent,
    UsersComponent,
    HomeComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    ControlPanelComponent,
    OrderComponent
,
    OrderDetailsComponent
],
  exports: [],
  providers: [AuthGuard, UserService, FileService]
})
export class AdminModule {}