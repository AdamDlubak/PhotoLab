import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// import { HomeComponent } from "./components/home/home.component";

//  import { AdminLayoutComponent } from "./components/admin/_layout/admin-layout.component";
//  import { LabLayoutComponent } from "./components/lab/_layout/lab-layout.component";
//  import { OthersLayoutComponent } from "./components/others/_layout/others-layout.component";

import { AuthGuard } from "./auth.guard";
// // import { DashboardComponent } from './components/dashboard/home/home.component';
// import { RegistrationFormComponent } from "./components/account/secure/registration-form/registration-form.component";

const appRoutes: Routes = [
  //Lab routes goes here


  {
    path: "",
    loadChildren: "app/components/lab/lab.module#LabModule"
  },
  // Others routes goes here  
  {
    path: "login",
    loadChildren: "app/components/others/others.module#OthersModule"
  },
  // Admin routes goes here  
  {
    path: "admin",
    loadChildren: "app/components/admin/admin.module#AdminModule",
  },
  // otherwise redirect to home
   { path: '**',  redirectTo: "", pathMatch: "full" }
  //  component: PageNotFoundComponent 
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
