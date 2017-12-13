import { AboutUsComponent } from './about-us/about-us.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from '@angular/router';

import { LabLayoutComponent } from "./_layout/lab-layout.component";
import { HomeComponent } from "./home/home.component";
import { OrderPhotoUploadComponent } from "./order-photo-upload/order-photo-upload.component";
import { OrderDetailedDataComponent } from "./order-detailed-data/order-detailed-data.component";
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ContactComponent } from './contact/contact.component';
import { OfferComponent } from './offer/offer.component';

export const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: "",
    component: LabLayoutComponent,
    children: [
      { path: "", redirectTo: 'home', pathMatch: 'full'},
      { path: "home", component: HomeComponent},
      { path: "contact", component: ContactComponent},
      { path: "order-photo-upload", component: OrderPhotoUploadComponent},
      { path: "order-detailed-data", component: OrderDetailedDataComponent},
      { path: "order-summary", component: OrderSummaryComponent},
      { path: "about-us", component: AboutUsComponent},
      { path: "offer", component: OfferComponent},
      { path: "user-panel", component: UserPanelComponent},
      { path: "**", redirectTo: "login", pathMatch: "full" }      
    ]
  }
]);
