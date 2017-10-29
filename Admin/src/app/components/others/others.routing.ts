import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { OthersLayoutComponent } from "./_layout/others-layout.component";
import { LoginFormComponent } from "./login-form/login-form.component";


export const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: "",
    component: OthersLayoutComponent,

    children: [
      { path: "", redirectTo: 'admin', pathMatch: 'full' },
      { path: "admin", component: LoginFormComponent },
      { path: "**", redirectTo: "admin", pathMatch: "full" }  
    ]
  }
]);
