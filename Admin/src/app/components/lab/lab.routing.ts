import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LabLayoutComponent } from "./_layout/lab-layout.component";
import { HomeComponent } from "./home/home.component";

export const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: "",
    component: LabLayoutComponent,
    children: [
      { path: "", redirectTo: 'home', pathMatch: 'full'},
      { path: "home", component: HomeComponent},
      { path: "**", redirectTo: "login", pathMatch: "full" }      
    ]
  }
]);
