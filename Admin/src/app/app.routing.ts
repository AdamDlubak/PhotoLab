import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";

import { LabLayoutComponent } from "./shared/layouts/lab-layout/lab-layout.component";
import { AdminLayoutComponent } from "./shared/layouts/admin-layout/admin-layout.component";
import { OthersLayoutComponent } from "./shared/layouts/others-layout/others-layout.component";

// import { DashboardComponent } from './components/dashboard/home/home.component';
import { LoginFormComponent } from "./components/account/public/login-form/login-form.component";
import { RegistrationFormComponent } from "./components/account/secure/registration-form/registration-form.component";

const appRoutes: Routes = [
  //Lab routes goes here
  {
    path: "",
    component: LabLayoutComponent,
    children: [
      { path: "", component: HomeComponent, pathMatch: "full" }
      // { path: 'about', component: AboutComponent },
      // { path: 'test/:id', component: AboutComponent }
    ]
  },

  // Admin routes goes here
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      { path: "register", component: RegistrationFormComponent }
      // { path: 'profile', component: ProfileComponent }
    ]
  },

  // Others routes goes here
  {
    path: "",
    component: OthersLayoutComponent,
    children: [
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "admin-login", component: LoginFormComponent }
      // { path: 'register', component: RegisterComponent },
    ]
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
