import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/modules/shared.module";

import { UserService } from "../../shared/services/user.service";
import { OthersLayoutComponent } from "./_layout/others-layout.component";
import { LoginFormComponent } from "./login-form/login-form.component";

import { Routing } from "./others.routing";

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, Routing],
  declarations: [OthersLayoutComponent, LoginFormComponent],
  exports: [],
  providers: [UserService]
})
export class OthersModule {}