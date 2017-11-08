import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LabLayoutComponent } from "./_layout/lab-layout.component";
import { HomeComponent } from "./home/home.component";
import { PhotoCropComponent } from "./photo-crop/photo-crop.component";

export const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: "",
    component: LabLayoutComponent,
    children: [
      { path: "", redirectTo: 'home', pathMatch: 'full'},
      { path: "home", component: HomeComponent},
      { path: "photo-crop", component: PhotoCropComponent},
      { path: "**", redirectTo: "login", pathMatch: "full" }      
    ]
  }
]);
