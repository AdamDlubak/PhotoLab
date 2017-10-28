import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/modules/shared.module";

import { UserService } from "../../shared/services/user.service";

import { EmailValidator } from "../../directives/email.validator.directive";

import { RegistrationFormComponent } from "./secure/registration-form/registration-form.component";
import { LoginFormComponent } from "./public/login-form/login-form.component";
import { EditFormComponent } from "./secure/edit-form/edit-form.component";

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule],
  declarations: [RegistrationFormComponent, EmailValidator, LoginFormComponent, EditFormComponent],
  providers: [UserService]
})
export class AccountModule {}
