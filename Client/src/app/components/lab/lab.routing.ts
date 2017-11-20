import { UserPanelComponent } from './user-panel/user-panel.component';
import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LabLayoutComponent } from "./_layout/lab-layout.component";
import { HomeComponent } from "./home/home.component";
import { OrderPhotoUploadComponent } from "./order-photo-upload/order-photo-upload.component";
import { OrderDetailedDataComponent } from "./order-detailed-data/order-detailed-data.component";

export const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: "",
    component: LabLayoutComponent,
    children: [
      { path: "", redirectTo: 'home', pathMatch: 'full'},
      { path: "home", component: HomeComponent},
      { path: "order-photo-upload", component: OrderPhotoUploadComponent},
      { path: "order-deitaled-data", component: OrderDetailedDataComponent},
      { path: "user-panel", component: UserPanelComponent},
      { path: "**", redirectTo: "login", pathMatch: "full" }      
    ]
  }
]);
