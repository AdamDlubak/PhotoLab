import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { EditFormComponent } from "./edit-form/edit-form.component";

import { AuthGuard } from "../../auth.guard";

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: "register", component: RegistrationFormComponent },
  { path: "login", component: LoginFormComponent },
  { path: "edit", component: EditFormComponent, canActivate: [AuthGuard] }
]);
